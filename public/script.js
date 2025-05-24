import { getTask as getTasks } from './helpers/getTask.helper.js';
import { addTask } from './helpers/addTask.helper.js';
import validator from './helpers/validateTask.js';
import './modal.js';

// DOM Elements
const $ = (selector) => document.querySelector(selector);
const submitTaskForm = $('form#submitTask'), overlay = $('.overlay'), modal = $('.modal'), alarmInput = modal.querySelector('input[name=alarm]'), addAlarm = modal.querySelector('.add-alarm'), tasklist = $('#tasklist'),  modalButton = $('.modal-button'), closeModalBtn = modal.querySelector('.close-modal'),  h4 = $('.taskcontainer h4'),  h1 = $('.taskcontainer h1');

// Data Store
let tasks = [];

// Render Tasks
const renderTasks = () => {
	const display = window.innerWidth;
	const trunc = display < 315 ? 15 : display < 368 ? 18 : display < 430 ? 25 : 30;

	tasklist.innerHTML = '';
	tasklist.style.display = tasks.length ? 'flex' : 'none';
	h1.style.display = tasks.length ? 'block' : 'none';
	h4.style.display = tasks.length ? 'none' : 'block';

	tasks.forEach(({ id, task, done }) => {
		const li = document.createElement('li');
		const shortTask = task.length > trunc ? task.slice(0, trunc) + '...' : task;
		li.dataset.taskid = id;
		li.innerHTML = `
			<span class="${done ? 'done' : ''}">${shortTask}</span>
			<div>
				<i class="fa-solid fa-circle-check"></i>
				<i class="fa-solid fa-trash"></i>
			</div>
		`;
		tasklist.appendChild(li);
	});
};

// Fetch Tasks
const fetchTasks = async () => {
	try {
		const data = await getTasks();
		if (data?.success) {
			tasks = data.tasks;
			renderTasks();
		} else {
			alert(data.message);
		}
	} catch (err) {
		alert(err.message);
	}
};

// Modal Controls
const openModal = () => {
	overlay.style.display = modal.style.display = 'block';
	document.documentElement.style.overflow = 'hidden';
};

const closeModal = () => {
	overlay.style.display = modal.style.display = 'none';
	document.documentElement.style.overflow = 'visible';
	addAlarm.style.display = 'block';
	alarmInput.style.display = 'none';
	submitTaskForm.reset();
};

// Task Operations
const deleteTodo = async (id) => {
	try {
		const res = await fetch(`/tasks/${id}`, { method: 'DELETE' });
		const data = await res.json();
		if (data.success) {
			tasks = tasks.filter(t => t.id !== id);
			renderTasks();
		} else alert(data.message);
	} catch (e) {
		alert(e.message);
	}
};

const updateStatus = async (id) => {
	try {
		const res = await fetch(`/tasks/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ update: 'status' })
		});
		const data = await res.json();
		if (data.success) {
			const task = tasks.find(t => t.id === id);
			if (task) {
				task.done = !task.done;
				renderTasks();
			}
		} else alert(data.message);
	} catch (e) {
		alert(e.message);
	}
};

// Event Listeners
modalButton.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

addAlarm.addEventListener('click', (e) => {
	const now = new Date();
	const isoTime = now.toLocaleDateString('sv-SE') + 'T' + now.toTimeString().slice(0, 5);
	alarmInput.value = isoTime;
	alarmInput.style.display = 'block';
	e.target.style.display = 'none';
});

submitTaskForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const formData = new FormData(e.target);
	const task = formData.get('task')?.trim();
	const alarm = formData.get('alarm');
	const error = validator(task);

	if (!task) return submitTaskForm.reset();
	if (error) return alert(error);

	const formattedAlarm = new Date(alarm).getTime();
	if (alarm && (isNaN(formattedAlarm) || formattedAlarm < Date.now()))
		return alert(isNaN(formattedAlarm) ? "Invalid alarm date" : "The time has already passed. Please select a valid alarm time.");

	try {
		const res = await addTask(task, formattedAlarm);
		const data = await res.json();
		if (res.ok) {
			tasks.unshift(data.task);
			renderTasks();
			closeModal();
		} else alert(data.message);
	} catch (err) {
		alert(err.message);
	}
});

tasklist.addEventListener('click', (e) => {
	const li = e.target.closest('li');
	if (!li) return;
	const id = li.dataset.taskid;

	if (e.target.classList.contains('fa-trash')) deleteTodo(id);
	else if (e.target.classList.contains('fa-circle-check')) updateStatus(id);
});

// Init
fetchTasks();