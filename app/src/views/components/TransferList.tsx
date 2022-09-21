import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

function not(a: any, b: any, id:string) {
		// @ts-ignore
		// return b.filter((value:any) => {
		// 	if(a.indexOf(value[id]) === -1){
		// 		return value[id];
		// 	};
		// })
}

function intersection(a: any, b: any, id : string) {
	// console.log('intersection a',a)
	// console.log('intersection b',b)
	// b.map((value:any) => value[id]);
	// console.log('intersection b custom',b)
	// return b.filter((value:any) => {
	// 	if(a.indexOf(value[id]) !== -1){
	// 		return value[id];
	// 	};
	// })
		// @ts-ignore
  	// return a.filter((value) => b.indexOf(value) !== -1);

}

function union(a: any, b: any, id:string) {
//   return [...a, ...not(b, a,id)];
}



interface TransferListOPtionsInterface {
	text : string
	id : string
}
interface TransferListInterface {
	leftData : any
	rightData : any
	options : TransferListOPtionsInterface
}
const reducer = (prevState:any, newState:any) => ({...prevState,...newState});
export default function TransferList(props:TransferListInterface) {
  
  const listId:string = props.options.id;
  const [left, setLeft] = React.useState(props.leftData);
  const [right, setRight] = React.useState(props.rightData);
	console.log("left",left);
	console.log("props",props);
//   const leftChecked = intersection(checked, left, props.options.id);
//   const rightChecked = intersection(checked, right, props.options.id);
const [checked, setChecked] = React.useState<any>({
	"left" : [],
	"right" : [],
	"ids" : []
});



  /**
   * 
   * @param value 리스트 전체 객체
   * @param position "left" 또는 "right"
   * @returns void
   */
  const handleToggle = (value: any,position : "left" | "right") => () => {
	// @ts-ignore
    	const currentIndex = checked.ids.indexOf(value[listId]);
		
		
	    console.log("before change checked , tmp",checked)	
	    if(currentIndex === -1){
		checked[position].push(value);
		checked.ids.push(value[listId]);
	    }else{
		checked[position].splice(currentIndex,1)
		checked.ids.splice(checked.ids.indexOf(value[listId]),1)
	    }
	    console.log("change checked , tmp",checked)

	setChecked({...checked});
	// @ts-ignore
//     const currentIndex = checked.indexOf(value);
//     const newChecked:any = [...checked];

//     if (currentIndex === -1) {
// 		// @ts-ignore
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }
//     console.log('handleToggle newChecked',newChecked);
//     setChecked(newChecked);
//     console.log('numberOfChecked(left',numberOfChecked(left));

  };

//   const numberOfChecked = (items: any) => intersection(checked, items,props.options.id).length;
  const numberOfChecked = (position: "left" | "right") => {
	console.log('numberOfChecked',checked);
	return checked[position].length;
  };
    

  const handleToggleAll = (items: any,position : "left" | "right") => () => {
	
//     if (numberOfChecked(items,position) === items.length ) {
// //       setChecked(not(checked, items, props.options.id));
// 	checked[position] = position === "left" ? left : right;
// 	checked[position].map((data : any) => {
// 		if(checked.ids.indexOf(data[listId]) === -1){
// 			checked.ids.push(data[listId])	
// 		}
// 	})
//     } else {
	if(numberOfChecked(position) === 0){
		checked[position] = position === "left" ? left : right;
		checked[position].map((data : any) => {
			if(checked.ids.indexOf(data[listId]) === -1){
				checked.ids.push(data[listId])	
			}
		})
	}else{
		checked[position].map((data:any) => {
			checked.ids.splice(checked.ids.indexOf(data[listId]),1)
		})
		checked[position] = [];
	}
	
//       setChecked(union(checked, items, props.options.id));
//     }
    	setChecked({...checked})
  };

  const handleCheckedRight = () => {

	setRight(right.concat(checked.left));
	
	
	setLeft(left.filter((item:any) =>{
		if(checked.ids.indexOf(item[listId]) !== -1){
			checked.ids.splice(checked.ids.indexOf(item[listId]),1)
		}else{
			return item;
		}
	}))
	checked.left = [];
	setChecked(checked);
//     setRight(right.concat(leftChecked));
//     setLeft(not(left, leftChecked,props.options.id));
//     setChecked(not(checked, leftChecked,props.options.id));
  };

  const handleCheckedLeft = () => {
	setLeft(left.concat(checked.right));
	
	
	setRight(right.filter((item:any) =>{
		if(checked.ids.indexOf(item[listId]) !== -1){
			checked.ids.splice(checked.ids.indexOf(item[listId]),1)
		}else{
			return item;
		}
	}))
	checked.right = [];
	setChecked(checked);
//     setLeft(left.concat(rightChecked));
//     setRight(not(right, rightChecked,props.options.id));
//     setChecked(not(checked, rightChecked,props.options.id));
    
  };

  const customList = (title: React.ReactNode, items: any,position : "right" | "left") => (
	
	
	<Card>
	<CardHeader
		sx={{ px: 2, py: 1 }}
		avatar={
		<Checkbox
			onClick={handleToggleAll(items,position)}
			checked={numberOfChecked(position) === items.length && items.length !== 0}
			indeterminate={
			numberOfChecked(position) !== items.length && numberOfChecked(position) !== 0
			}
			disabled={items.length === 0}
			inputProps={{
			'aria-label': 'all items selected',
			}}
		/>
		}
		title={title}
		subheader={`${numberOfChecked(position)}/${items.length} selected`}
	/>
	<Divider />
	<List
		sx={{
		width: "30vh",
		height: "50vh",
		bgcolor: 'background.paper',
		overflow: 'auto',
		}}
		dense
		component="div"
		role="list"
	>
		{items.map((value: any, index:number) => {
			const labelId = value[props.options.id]
		return (
			<ListItem
			key={labelId}
			role="listitem"
			button
			onClick={handleToggle(value,position)}
			>
			<ListItemIcon>
				<Checkbox
					//@ts-ignore
				checked={checked.ids.indexOf(labelId) !== -1}
				tabIndex={-1}
				disableRipple
				/>
			</ListItemIcon>
			<ListItemText
			//@ts-ignore
			primary={value[props.options.text]} />
			</ListItem>
			);
		})}
		<ListItem />
	</List>
	</Card>
    	
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList('Choices', left, "left")}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
        //     disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
        //     disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Chosen', right,"right")}</Grid>
    </Grid>
  );
}
