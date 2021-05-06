import React from 'react'
import { useRouter } from 'next/router'
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";

const App = ({ children }) => {
	const router = useRouter()
	return(
		<main>
			<style jsx global>{`
				body {
					margin: 0px;
					padding: 0px;
				}
			`}
			</style>
			{children}
		</main>
	)
}

export default App
