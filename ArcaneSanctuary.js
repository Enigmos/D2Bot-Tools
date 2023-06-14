/**
*	@filename	ArcaneSanctuary.js
*	@author		Drakan
*	@desc		"We... live... again!"
*	@desc		A modified variation of the GhostBusters script that is focused in clearing all Spectres in Arcane Sanctuary.
*/

function ArcaneSanctuary() {
	this.clearGhosts = function () {
		var room, result, rooms, monster, monList;

		room = getRoom();

		if (!room) {
			return false;
		}

		rooms = [];

		do {
			rooms.push([room.x * 5 + room.xsize / 2, room.y * 5 + room.ysize / 2]);
		} while (room.getNext());

		while (rooms.length > 0) {
			rooms.sort(Sort.points);
			room = rooms.shift();

			result = Pather.getNearestWalkable(room[0], room[1], 15, 2);

			if (result) {
				Pather.moveTo(result[0], result[1], 3);

				monList = [];
				monster = getUnit(1);

				if (monster) {
					do {
						if ([38, 39, 40, 41, 42, 631, 632, 633].indexOf(monster.classid) > -1 && getDistance(me, monster) <= 30 && Attack.checkMonster(monster)) {
							monList.push(copyUnit(monster));
						}
					} while (monster.getNext());
				}

				if (!Attack.clearList(monList)) {
					return false;
				}
			}
		}

		return true;
	};

    this.arcane = function () { // Arcane Sanctuary WP
		Pather.useWaypoint(74);
		Precast.doPrecast(true);
		Pather.moveToExit(74, true);
		this.clearGhosts();
        
		return true;
	};

    var i,
		sequence = ["arcane"];

	for (i = 0; i < sequence.length; i += 1) {
		Town.doChores();

		try {
			this[sequence[i]]();
		} finally {
			Town.goToTown();
		}
	}

    return true;
}