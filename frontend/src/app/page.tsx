"use client"
import {useTheme} from '@mui/material/styles';
import {Button, TextField} from '@mui/material';
import {useAppDispatch, useAppSelector} from '@/redux/reduxHooks'
import {increment, decrement} from '@/redux/slices/counterSlice'
import Image from 'next/image'
import styles from './page.module.css'
import {useState} from 'react';

export default function Home() {
	const count = useAppSelector((state) => state.counter.value)
	const dispatch1 = useAppDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	return (
		<section>

			<Button
				variant="contained"
				aria-label="Increment value"
				onClick={() => dispatch1(increment())}
			>
				Increment
			</Button>
			<span>{count}</span>
			<Button
				variant="contained"
				aria-label="Decrement value"
				onClick={() => dispatch1(decrement())}
			>
				Decrement
			</Button>
			<form>
				<TextField
					label="Username"
					variant="outlined"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Password"
					type="password"
					variant="outlined"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<Button type="submit" variant="contained" color="primary" fullWidth>
					Login
				</Button>
			</form>
		</section>
	)
}
