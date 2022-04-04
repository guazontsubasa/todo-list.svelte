<script>
	import {notifications} from './notifications.js'
	import Toast from './Toast.svelte'

	let todos = []; // listado de tareas
	let todo = { id: 0, texto: "", estado: false }; //item tarea de las tareas
	
	//ALMACENAMIENTO LOCAL ===========================================
	if (localStorage.getItem('todos')) {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	$: localStorage.setItem('todos', JSON.stringify(todos));
	//===============================================================

	//ABM FUNCIONES =================================================
	const agregarTodo = () => {
		if(!todo.texto.trim()){			
			todo.texto = '';
			return;
		}
		// todos.push(todo);// no funciona
		todo.id = Math.floor((Math.random() * 1000000) + 1);
		todos = [...todos, todo];
		todo = { id: 0, texto: "", estado: false };

		notifications.info('Agregado!', 1000);
	}

	const borrarTodo = id => {
		todos = todos.filter(todo => todo.id !== id);
		notifications.danger('Borrado!', 1000);
	}

	const toggleTodo = id => {
		//toggle estado		
		todos = todos.map(item => {
			if (item.id === id){
				if (!item.estado){
					notifications.success('Tarea realizada!', 1000);
				}else{
					notifications.warning('Tarea pendiente', 1000);
				}
			}
			return (item.id === id) ? { ...item, estado: !item.estado } : item;
		});
		
	}
	//===============================================================

	//RENDERIZADO ===================================================
	const classIcono = valor => {
		return valor ? 'bi bi-arrow-clockwise' : 'bi bi-check';
	}
	const classEstado = valor => {
		return valor ? 'btn-success' : 'btn-warning';
	}
	//===============================================================	
</script>

<div class="container">
	<Toast />

	<h1 class="display-5">Lista de tareas</h1>
	<form on:submit|preventDefault={agregarTodo}>
		<div class="mb-3">
		  
			<label for="todo-texto" class="form-label">Nueva tarea</label>
		  	<input 
				type="text" 
				bind:value={todo.texto} 
				class="form-control shadow border-0" 
				id="todo-texto" 
				placeholder="Enter para agregar la tarea.."
				autocomplete="off">
			
		</div>
	</form>

	<div class="shadow my-3 p-3 lead">
		{#each todos as item}
			<p class={item.estado ? 'text-decoration-line-through' : ''}>{item.texto}</p>
			
			<button type="button" class="btn {classEstado(item.estado)}" on:click={toggleTodo(item.id)}>
				<i class={classIcono(item.estado)}></i>
			</button>
			
			<button type="button" class="btn btn-danger" on:click={borrarTodo(item.id)}><i class="bi bi-trash"></i></button>			
		{/each}
	</div>

</div>