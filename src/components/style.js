import styled from 'styled-components'

export const PageContainer = styled.div`
	body{
		margin: 0;
	}
`
export const TigerStyle = styled.div`
	body{
		margin: 0;
	};
	text-align: center;
	margin-top: 3em;
	#predictionContainer{
		padding-top: 2em;
		width: 100%;
    font-size: 24px;
	};
	.content{
		width: 100%;
	};
	.address{
		width: 45%;
		text-align: center;
    font-size: 20px;
	};
	.history{
		text-align: left;
		width: 20em;
		height: 60px;
		overflow: scroll;
		paddingBottom: 2em;
	};
	.quantity{
		width: 5%;
		text-align: center;
    font-size: 20px;
	};
	align-items: center;
`
export const Button = styled.button`
	&:hover: {
		cursor:'pointer';
	}
`
export const LazyContainer = styled.div`
	margin: 0;
	padding: 0;
`
export const Header = styled.header`
	background-color: red;
	height: 2rem;
	position: fixed;
	float: left;
	font-size: 1.5rem;
	text-align: left;
`
export const ThumbnailLabelGroup = styled.div`
    &.notSelected{
        border: rgb(255,255,255) 5px solid;
    }
    &.selected{
        border: rgb(0,255,0) 5px solid;
    }
    grid-column: ${props => props.col ? props.col : 'auto'};
    grid-row: ${props => props.row ? props.row : 'auto'};
    display: inline-block;
    height: 4rem;
    margin: auto;
    width: 4rem;
    background-size: 100%;
    background-image: ${props => props.img ? props.img : 'auto'};
    #lbl{
        text-align: center;
        display: inline-block;
        position: absolute;
        transform: translate(-20px, 0px);
        float: right;
    }
    div{
        float: right;
        background-color: yellow;
        transform: translate(75px, 0px);
    }
`

export const ThumbnailDiv = styled.div`
    display: grid;
    width: 100%;
    margin: auto;

`

export const UploadFormStyle = styled.div`
    padding-left: 20%;
    padding-right: 20%;
    padding-top: 2rem;
    #description{
        font-weight: 700;
        font-size: .8rem;
        text-align: center;
        background-color: pink;
        height: 100%;
        width: 90%;
        border: 1px solid hotpink;
        border-radius: 1rem;
        #margin: 1rem, 1rem, 2rem, 1rem;
        padding-bottom: 2%;
        padding-top: 2%;
        padding-right: 5%;
        padding-left: 5%;
        margin-bottom: 2rem;
    }
    .form{
        form{

            .select{
                display: block;
                font-size: 16px;
                font-family: sans-serif;
                font-weight: 700;
                line-height: 1.3;
                margin-bottom: .5rem;
                padding: .6em 1.4em .5em .8em;
                width: 100%;
                max-width: 100%;
                box-sizing: border-box;
                border: 1px solid #aaa;
                box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
                border-radius: .5em;
                -moz-appearance: none;
                -webkit-appearance: none;
                appearance: none;
                background-repeat: no-repeat, repeat;
                background-position: right .7em top 50%, 0 0;
                background-size: .65em auto, 100%;
                &:hover {
                        border-color: #888;
                }
                &:focus {
                    outline: none;
                }
                &#select{
                    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
                }
                &#custom-file-upload{
                    background-color: #fff;
                    background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='10px' height='10px' viewBox='0 0 10 10' enable-background='new 0 0 10 10' xml:space='preserve'%3E%3Cg%3E%3Cpath fill='%23127DB0' d='M4.037,1.192c0-0.615,0.27-0.961,0.961-0.961s0.961,0.346,0.961,0.961v2.865h2.83 c0.497,0,0.961,0.27,0.961,0.961c0,0.691-0.464,0.96-0.961,0.96h-2.83v2.828c0,0.615-0.269,0.961-0.961,0.961 S4.037,9.423,4.037,8.808V5.979H1.211c-0.499,0-0.961-0.269-0.961-0.96c0-0.692,0.462-0.961,0.961-0.961h2.826V1.192z'/%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
                    height: 2rem;
                    display: inline-block;
                    padding: 6px 12px;
                    cursor: pointer;

                }
                &[type="file"]{
                    display: none;
                }
                &[type="text"]{
                    color: black;
                }
                &[type="textarea"]{
                    height: 5rem;    
                }
                &[type="submit"]{
                    background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='10px' height='10px' viewBox='0 0 10 10' enable-background='new 0 0 10 10' xml:space='preserve'%3E%3Cpath fill='%2312BE0A' d='M5,9.75c2.609,0,4.75-2.141,4.75-4.75c0-2.61-2.141-4.75-4.753-4.75C2.387,0.25,0.25,2.39,0.25,5 C0.25,7.609,2.39,9.75,5,9.75z M4.393,7.439c-0.228,0-0.412-0.111-0.555-0.276L2.594,5.702c-0.123-0.14-0.167-0.266-0.167-0.416 c0-0.324,0.266-0.579,0.583-0.579c0.185,0,0.324,0.082,0.454,0.225l0.923,1.095l1.778-2.822c0.144-0.218,0.308-0.331,0.518-0.331 c0.313,0,0.597,0.235,0.597,0.556c0,0.119-0.047,0.256-0.129,0.388L4.945,7.133C4.816,7.32,4.615,7.439,4.393,7.439z'/%3E%3C/svg%3E"), linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
                }
            }
            border: solid white;
            border-width: .5rem;
            }
        }
    }
`

export const StylePost = styled.div`
    padding-top: 3.4rem;
    background-color: gray;
    background-image: linear-gradient(green,blue,red);
    height: 100%;
    padding-bottom: 3rem;
    .selling{
        width: 100%;
        border-bottom: solid gray;
        border-bottom-width: 1px;
        .sellling_spacer{
            width: 33.3%;
            display: inline-block;
            padding-top: .25rem;
        }
        #selling_left{
            text-align: center; 
            width: 33.3%;
            display: inline-block;
            border-bottom: solid #f1385d;
            border-bottom-width: 5px;
            font-size: .8rem;
            #backArrow{
                float:left;
            }
        }
    }
`
export const CategoryStyles = styled.div`
    height: ${props => props.height ? props.height :'20rem'};
    .buffer{
        height: 90%;
        margin: 5%;
        padding-left: 20%;
        padding-right: 20%;
        #padding-top: 5%;
        @media screen and (max-width: 500px){
            padding-top: 10%;
        }
        .categories-space{
            width: 100%;
            height: 12%
        }
        .categories{
            border-radius: 1rem;
            text-align: center;
            background-color: lightgray;
            width: 100%;
            padding-top: 5%;
            padding-bottom: 5%;
            #height: 10%;
            &:hover{
                background-image: linear-gradient(to bottom right, pink, hotpink, gray)
            }
            @media screen and (max-width: 500px){
               # height: 10%;
            }
            .button-name{
                font-weight: 700;
                font-size: 1.5rem;
                @media screen and (max-width: 500px){
                    font-size: .8rem;
                }
            }
            .button-description{
                font-size: .7rem;
                @media screen and (max-width: 500px){
                    font-size: .5rem;
                }
            }
            #button-spacer{
                height: 10%;
                width: 100%;
            }
        }
    }
`

