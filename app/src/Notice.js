import React from 'react';
import { Card, CardHeader, CardMedia, Avatar } from '@material-ui/core';
import { IconButton, Typography, CardContent, Menu } from '@material-ui/core';
import { CardActions, Collapse, Theme, MenuItem } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Notice.css';
import Link from "@material-ui/core/Link";

const ITEM_HEIGHT = 48;

export default function Notice(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}


	return (
		<Card className='Card'>
			<CardHeader
				avatar={
					<Avatar aria-label='recipe' className='Avatar'>
						VB
					</Avatar>
				}
				action={
					<div>
						<IconButton aria-label='settings'
												aria-controls='long-menu'
												aria-haspopup='true'
												onClick={handleClick}>
							<MoreVertIcon/>
						</IconButton>
						<Menu
							id='long-menu'
							keepMounted
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							PaperProps={{
								style: {
									maxHeight: ITEM_HEIGHT * 4.5,
									width: 200,
								},
							}}>
							<MenuItem onClick={() => { props.delete(props.id); handleClose() }}>
								Delete
							</MenuItem>
							<MenuItem onClick={() => { props.edit(props.id); handleClose() }}>
								Edit
							</MenuItem>
							))}
						</Menu>
					</div>
				}
				title='Заметка'
			/>
			<CardContent>
				<Typography variant='body2' color='textPrimary' component='p'>
					{props.text}
				</Typography>
				<Typography variant='body2' component='p'>
				{
					props.tags.map((tag, i) => {
						return (
							<Link
								component='button'
								onClick={ () =>  props.filter(tag) } key={i}>
								{ tag }
							</Link>
						)
					})
				}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label='add to favorites'>
					<FavoriteIcon/>
				</IconButton>
				<IconButton aria-label='share'>
					<ShareIcon/>
				</IconButton>
				<IconButton
					aria-label='show more'
				>
					<ExpandMoreIcon/>
				</IconButton>
			</CardActions>
		</Card>
	);
}