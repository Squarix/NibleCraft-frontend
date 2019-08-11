import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Paper from  '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Notice from './Notice';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import update from 'react-addons-update';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.state = {
      text: '',
      tags: [],
      posts: [],
			current_posts: [],
			method: { action: this.handleSave, name: 'Сохранить' }
    };
  }

  findHashtags = (input) => {
		let regexp = /\B\#\w\w+\b/g
		let result = input.match(regexp);
		if (result) {
			return result;
		} else {
			return [];
		}
	};


  handleSave = () => {
    let post = { text: this.state.text, tags: this.state.tags };
    this.setState(prevState => ({
      posts: [...prevState.posts, post ],
      text: '',
			tag: '',
			tags: [],
      })
    );
  };

  editPost = (id) => {
  	let post = this.state.posts[id];
  	this.setState({
			method: { action: () => this.handleEdit(id), name: 'Обновить' },
			text: post.text,
			tags: post.tags
		});
	};

  handleEdit = (id) => {
  	let text = this.state.text;
  	let tags = this.state.tags;
  	this.setState({
			posts: update(this.state.posts, { [id]: { text: { $set:  text }, tags: { $set: tags }}}),
			method: { action: this.handleSave, name: 'Сохранить' },
			text: '',
			tag: '',
			tags: []
		});
	};

  setCurrentTag = (tag) => {
  	this.setState({
			tag: tag
		});
	};

  filterTag = (tag) => {
		if (tag == '')
			return this.state.posts;

		return this.state.posts.filter((post) => {
			return post.tags.indexOf(this.state.tag) !== -1
		});

	};

  handleChange = (event) => {
  	let text = event.target.value;
    this.setState({[event.target.name]: text,
			tags: this.findHashtags(text)});
  };

  deletePost = (id) => {
  	let items = this.state.posts;
		items.splice(id, 1);
		this.setState({
  		posts: items
		});
	};

  render() {
    return (
      <div>
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' color='inherit' aria-label='menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6'>
              React App
            </Typography>
          </Toolbar>
        </AppBar>
        <Container className='App'>
          <Grid item xs={12} className='App-header' >
						<Breadcrumbs aria-label='breadcrumb'>
							<Link color='danger' component='button' onClick={ () => this.setCurrentTag('') }>
								{ this.state.tag }
							</Link>
						</Breadcrumbs>
            <TextField
              id='standard-full-width'
              style={{ margin: 8 }}
              placeholder='Заметка'
              helperText={ this.state.tags.join(', ') }
              fullWidth
              multiline
              onChange={ this.handleChange }
              name='text'
              value={this.state.text}
              margin='normal'
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button variant='contained' onClick={ this.state.method.action } color='primary' className='Button'>
							{ this.state.method.name }
            </Button>
            <Grid container xs={12} className='Notice'>
              {
								this.filterTag(this.state.tag).map((post, i) => {
                return (
                  <Grid key={i} item>
                    <Notice
											text={ post.text }
											filter={ this.setCurrentTag }
											tags={ post.tags }
											edit={ this.editPost }
											delete={ this.deletePost }
											id={i}
										/>
                  </Grid>)
                })
              }
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}


export default App;
