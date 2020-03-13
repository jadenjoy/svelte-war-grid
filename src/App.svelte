<script>
	import Board from './Board.svelte';
	const players = [
		{id:1, name: "Команда 1", color: "#000"},
		{id:1, name: "Команда 2", color: "#00ff3c"},
		{id:1, name: "Команда 3", color: "#ff003a"},
		{id:1, name: "Команда 4", color: "#2011ff"},
		{id:1, name: "Команда 5", color: "#00ff2c"},
		{id:1, name: "Команда 6", color: "#b6ff0a"},
		{id:1, name: "Команда 7", color: "#270505"},
		{id:1, name: "Команда 8", color: "#00ff2c"},
		{id:1, name: "Команда 9", color: "#5fdaff"},
		{id:1, name: "Команда 10", color: "#00ff2c"},

	];
</script>

<div class="game">
	<div class="game-board">
		<Board players="{players}"/>
	</div>
	<div class="game-info">
		{#each players as player, i}
			<div class="status" style="color: {player.color}">{player.name}</div>
		{/each}

		<div></div>
		<ol></ol>
	</div>
</div>

<style>
	.game {
		font: 14px "PT Sans", Futura, sans-serif;
		margin: 20px;
		display: flex;
		flex-direction: row;
	}

	.game-info {
		margin-left: 20px;
	}

	.status {
		margin-bottom: 10px;
	}

	ol {
		padding-left: 30px;
	}
</style>