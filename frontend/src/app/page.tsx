"use client"
import {useTheme} from '@mui/material/styles';
import {Button, TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {useAppDispatch, useAppSelector} from '@/redux/reduxHooks'
import {increment, decrement} from '@/redux/slices/counterSlice'
import Image from 'next/image'
import styles from './page.module.css'
import {useState, useEffect} from 'react';
import client from '@/axiosClient';

export default function Home() {
	const count = useAppSelector((state) => state.counter.value)
	const dispatch1 = useAppDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [slots, setSlots] = useState([])

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		const res = await client.post('/login/', {
			username: "test-user-1", password: "test1029"
		})
		console.log(res)
	}

	const handleChange = (e: any) => {
		console.log(e.target)
	}

	useEffect(() => {
		const fetchAPI = async () => {

			const {data: slots} = await client.get('/time-slots/')
			console.log(slots)
			setSlots(slots);
		}
		fetchAPI()
	}, [])
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
			<FormControl fullWidth>
				<InputLabel id="select_time_slot_label">Time Slots</InputLabel>
				<Select
					labelId="select_time_slot_label"
					id="select_time_slot"
					label="Time Slot"
					name="time_slot"
					defaultValue=""
					onChange={handleChange}
				>
					{slots && slots.length > 0 && slots.map(({id, time_range}) => {
						return <MenuItem key={id} value={id}>{time_range}</MenuItem>

					})}
				</Select>
			</FormControl>
			<form onSubmit={handleSubmit}>
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
