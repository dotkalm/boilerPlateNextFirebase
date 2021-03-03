import React, { useState, useEffect } from 'react'
import {
	sendToDB,
	handleFormImages,
	uploadImages,
} from '../actions/uploads'
import { 
    UploadFormStyle,
    ThumbnailDiv,
    ThumbnailLabelGroup
} from './style'

const firebaseURLs = {}
let thumbGrid = null
let notSubmitted = true

const UploadForm = props => {
	const [ primary, setPrimary ] = useState(0)
	const [ imageRefs, setImageRefs ] = useState([])
	const [ imageData, setImageData ] = useState({})
	const [ addImageButton, setAddImageButton ] = useState('Add Photos')
	const [ form, setForm ] = useState({
		images: [],
		description: '',
	})

	const onChange = event => {
		if(event.target.name ==='image'){
			const { files } = event.target
			const filesArr = [...files]
			const num = 10 - imageRefs.length
			const spliceArr = filesArr.splice(0, num);
			handleFormImages(spliceArr, imageData, imageRefs)
				.then(r => {
					const o = {}
					for(let i=0; i<r.length; i++){
						const { name, extension, result } = r[i]
						o[name] = result
					}
					setForm({...form, images: [...form.images, ...spliceArr] })
					setImageData({...imageData, ...o})
					setImageRefs([...imageRefs, ...r])
				})
		}else{
			setForm({ ...form, 
				[event.target.name]: event.target.value
			})
		} 
	}

	const onClickX = event => {
		const indexNum = +event.target.id
		const randKey = imageRefs[indexNum].name
		delete firebaseURLs[randKey]
		delete imageData[randKey]
		const copyDataImages = [...imageRefs]
		const copyImages = [...form.images]
		copyImages.splice(indexNum, 1)
		copyDataImages.splice(indexNum, 1)
		setForm({...form, images: copyImages})
		setImageRefs(copyDataImages)
		setAddImageButton('Add Photos')
	}

	const getCoords = (num) => {
		if(num === 0){
			thumbGrid = {
				[num] : [1,1]
			}
		} else if(thumbGrid[num-1][0] === width){
			const x = 1
			const y = thumbGrid[num-1][1] + 1
			thumbGrid[num] = [x,y]   
		}else{
			const x = thumbGrid[num-1][0] + 1
			const y = thumbGrid[num-1][1] 
			thumbGrid[num] = [x,y] 
		} 
		return thumbGrid[num]
	}

	const selectPrimary = event => {
		setPrimary(+event.target.id)
	}
	const isInvalid = 
		imageRefs.length === 0 ||
		form.description === '' 

	const onSubmit = async event => {
		event.preventDefault()
		if(notSubmitted === true){
			notSubmitted = false
			const send = await sendToDB(imageRefs, form)
		}
	}

	const getDims = event => {
		imageRefs[+event.target.id] = {...imageRefs[+event.target.id], 
			width:event.target.naturalWidth , 
			height: event.target.naturalHeight}
	}
	return(
		<UploadFormStyle>
				upload
			<div className="form">
				<form onSubmit={onSubmit}>
					<ThumbnailDiv>
						{imageRefs.map((e,i) => {
							const coords = getCoords(i)
							const col = coords[0]
							const row = coords[1]
							const thumb = imageData[e.name]
							return(
								<ThumbnailLabelGroup key={i} id={i} img={`url(${thumb})`}
								row={row} col={col} onClick={selectPrimary} 
								className={primary === i ? 'selected' : 'notSelected'}>
								<label id="lbl" key={i+1}>
								<div key={e} id={i} onClick={onClickX}>X</div>
								</label>
								<img src={thumb} height='1px' width='1px' alt={e.name} id={i} onLoad={getDims}/>
								</ThumbnailLabelGroup>
							)
						})}
					</ThumbnailDiv>
					<label className="select" id="custom-file-upload">
						{addImageButton}
						<input className="select" name='image' type='file' 
						multiple onChange={onChange}/>
					</label>
					<textarea type='text' key="title" className='select' 
						name="title" placeholder='add title' 
						onChange={onChange} rows="1">
					</textarea>
					<textarea type='text' key="description" className='select' 
						name="description" placeholder='add description' 
						onChange={onChange} rows="5">
					</textarea>
					<textarea key="year" type='text' className='select' 
						name="year" placeholder='add year' 
						onChange={onChange} rows="1">
					</textarea>
					<textarea key="medium" type='text' className='select' 
						name="medium" placeholder='add medium' 
						onChange={onChange} rows="1">
					</textarea>
					<textarea key="size" type='text' className='select' 
						name="size" placeholder='add size' 
						onChange={onChange} rows="1">
					</textarea>
					<button className="select" type='submit' disabled={isInvalid}>
						Add
					</button>
				</form>
			</div>
		</UploadFormStyle>
	)

}
export default UploadForm


