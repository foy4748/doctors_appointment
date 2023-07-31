"use client"
import {useTheme} from '@mui/material/styles';
import {Button, TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'

import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';

import {useAppDispatch, useAppSelector} from '@/redux/reduxHooks'
import {increment, decrement} from '@/redux/slices/counterSlice'
import Image from 'next/image'
import styles from './page.module.css'
import {useState, useEffect} from 'react';
import client from '@/axiosClient';
import moment from 'moment';
import {headers} from 'next/dist/client/components/headers';

export default function Home() {
	const count = useAppSelector((state) => state.counter.value)
	const dispatch1 = useAppDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [slots, setSlots] = useState([])
	const [currentSlot, setCurrentSlot] = useState('')
	const [bookingDate, setBookingDate] = useState(moment({}))

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		const {data} = await client.post('/login/', {
			username: "test-user-1", password: "test1029"
		})
		console.log(data)
		localStorage.setItem('token', data.token)
	}

	const handleChange = (e: any) => {
		setCurrentSlot(e.target.value)
	}

	const handleBooking = async (e: any) => {
		e.preventDefault();
		console.log(currentSlot, bookingDate.format('YYYY-MM-DD'))
		const payload = {
			time_slot: currentSlot,
			"date": bookingDate.format('YYYY-MM-DD'),
			headers: {
				Authorization: `Token ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : ''}`
			}
		}
		console.log(payload)
		const {data} = await client.post('/bookings/', payload)
		console.log(data)
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
			<form onSubmit={handleBooking}>
				<FormControl fullWidth>
					<InputLabel id="select_time_slot_label">Time Slots</InputLabel>
					<Select
						labelId="select_time_slot_label"
						id="select_time_slot"
						label="Time Slot"
						name="time_slot"
						value={currentSlot}
						onChange={handleChange}
					>
						{slots && slots.length > 0 && slots.map(({id, time_range}) => {
							return <MenuItem key={id} value={id}>{time_range}</MenuItem>

						})}
					</Select>
				</FormControl>
				<FormControl>
					<LocalizationProvider dateAdapter={AdapterMoment}>
						<DateCalendar value={bookingDate} onChange={(newValue: any) => {
							setBookingDate(newValue)
							console.log(bookingDate)
						}} />
					</LocalizationProvider>
				</FormControl>
				<Button type="submit" variant="contained" color="primary" fullWidth>
					Book Now
				</Button>
			</form>
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
