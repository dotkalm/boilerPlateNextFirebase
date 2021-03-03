import getFirebase from '../shared/firebaseClient'
import moment from 'moment'
const firebase = getFirebase()
import { setDoc } from './firebase'

export const sendToDB = async (imageRefs, form) => {
	const { description, year, medium, size, title } = form
	const primaryKey = imageRefs[0].name 
	const timeStamp = moment().valueOf() 
	const imgAsset = {
		key: primaryKey,
		timeStamp,
		description,
		imageRefs,
	}
	const sendToFlask = async () => {
		const token = await firebase.auth.currentUser.getIdToken(true)
		const isAdmin = await firebase.auth.currentUser.getIdTokenResult()
		console.log(token, isAdmin.claims)
		const data = new FormData();
		data.append('image', form.images[0])
		data.append('key', primaryKey);
		data.append('width', imageRefs[0].width)
		data.append('height', imageRefs[0].height)
		const f = {...form}
		f.details = { medium, size, title, year }
		delete f.images
		for(const k in f){
			data.append(k, f[k])
		}
		console.log(f)
		try {
			const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/tiles/`
			const obj = {
				method: 'POST',
				credentials: 'include',
				body: data,
				headers: {
					'enctype': 'multipart/form-data',
					'Authorization': token,
				}
			}
			const registerResponse = await fetch(url, obj)
			const parsedResponse = await registerResponse.json()
			return parsedResponse
		}catch(err){
			return err
		}
	}
	const levels = await sendToFlask()
	console.log(levels, 50)
	const thumb = levels.data[2]
	const levelCount = levels.data[0] 
	for(let i=0; i< imgAsset.imageRefs.length; i++){
		delete imgAsset.imageRefs[i].result
	}
	imgAsset['levels'] = levelCount
	imgAsset['thumb'] = thumb
	return levels
}
export const handleFormImages = arr => {
	const newImgArray = [] 
	const newImgArrayFormData = [] 
	let arrLength = arr.length
	return Promise.all(arr.map((f,index) => {
		return new Promise((resolve,reject) => {
			const regex = /\.(jpg|JPG|gif|GIF|jpeg|JPEG|PNG|png)$/
			const search = f.name.search(regex)
			if(search !== -1){
				const fileExtension = f.name.slice(search)
				const random = Math.random().toString(36).substring(2, 15)
				const moreRandom = Math.random().toString(36).substring(2, 15)
				const randKey = `${random}${moreRandom}`
				const reader = new FileReader()
				reader.readAsDataURL(f)
				reader.onload = () => {
					return resolve({
						result: reader.result, 
						name: randKey, 
						extension: fileExtension
					})
				}
			}else{ 
				reject('error')
			}
		})
	})).then(array => {
		if(array.length === arr.length){
			return array 
		}
	})
}
export const uploadImages = async (imageRefs,form) => {
	const validateURLs = {}
	return Promise.all(imageRefs.map((element, index) => {
		return new Promise((resolve,reject) => {
			const randKey = element.name
			const uploadTask = firebase.storage.ref('images/')
				.child(`${randKey}${element.extension}`)
				.put(form.images[index])
			uploadTask.on('state_changed', 
				snapshot => {}, 
				error =>  reject(error), 
				() => uploadTask.snapshot.ref.getDownloadURL().then(url => resolve({url, randKey}))
			)
		})
	})).then(urls => {
		const o = {}
		for(let i=0; i<urls.length; i++){
			const u = urls[i]
			const { url, randKey } = u 
			o[randKey] = url
		}
		return o
	})
}
