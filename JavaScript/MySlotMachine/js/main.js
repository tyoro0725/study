'use strict';

{
	class Panel {
		constructor() {
			const section = document.createElement('section');
			section.classList.add('panel'); 

			this.img = document.createElement('img');
			this.img.src = this.getRandomImage();

			this.timeoutId = undefined;

			this.stop = document.createElement('div');
			this.stop.textContent = 'STOP';
			this.stop.classList.add('stop', 'inactive');
			this.stop.addEventListener('click', () => {
				if (this.stop.classList.contains('inactive')) {
					return;
				}
				this.stop.classList.add('inactive');
				clearTimeout(this.timeoutId);

				panelsLeft--;

				if (panelsLeft === 0) {
					spin.classList.remove('inactive');
					panelsLeft = 8;
					checkResult();
				}
			});

			section.appendChild(this.img);
			section.appendChild(this.stop);

			const main = document.querySelector('main');
			main.appendChild(section);
		}

		getRandomImage() {
			const images = [
				'img/rikkai_01_yukimura.jpg',
				'img/rikkai_02_sanada.jpg',
				'img/rikkai_03_yanagi.jpg',
				'img/rikkai_04_nioh.jpg',
				'img/rikkai_05_yagyu.jpg',
				'img/rikkai_06_marui.jpg',
				'img/rikkai_07_jackal.jpg',
				'img/rikkai_08_kirihara.jpg',
				
			];
			return images[Math.floor(Math.random() * images.length)];
		}

		spin() {
			this.img.src = this.getRandomImage();
			this.timeoutId = setTimeout(() => {
				this.spin();
			}, 50);
		}

		isUnmatched(p1, p2, p3, p4, p5, p6, p7) {
				return this.img.src !== p1.img.src && this.img.src !== p2.img.src
				&& this.img.src !== p3.img.src && this.img.src !== p4.img.src
				&& this.img.src !== p5.img.src && this.img.src !== p6.img.src
				&& this.img.src !== p7.img.src;
		}

		unmatch() {
			this.img.classList.add('unmatched');
		}

		activate() {
			this.img.classList.remove('unmatched');
			this.stop.classList.remove('inactive');
		}
	}

	function checkResult() {
		if (!panels[0].isUnmatched(panels[1], panels[2], panels[3], panels[4],
			panels[5], panels[6], panels[7])) {
			panels[0].unmatch();
		}
		if (!panels[1].isUnmatched(panels[0], panels[2], panels[3], panels[4],
			panels[5], panels[6], panels[7])) {
			panels[1].unmatch();
		}
		if (!panels[2].isUnmatched(panels[0], panels[1], panels[3], panels[4],
			panels[5], panels[6], panels[7])) {
			panels[2].unmatch();
		}
		if (!panels[3].isUnmatched(panels[0], panels[1], panels[2], panels[4],
			panels[5], panels[6], panels[7])) {
			panels[3].unmatch();
		}
		if (!panels[4].isUnmatched(panels[0], panels[1], panels[2], panels[3],
			panels[5], panels[6], panels[7])) {
			panels[4].unmatch();
		}
		if (!panels[5].isUnmatched(panels[0], panels[1], panels[2], panels[3],
			panels[4], panels[6], panels[7])) {
			panels[5].unmatch();
		}
		if (!panels[6].isUnmatched(panels[0], panels[1], panels[2], panels[3],
			panels[4], panels[5], panels[7])) {
			panels[6].unmatch();
		}
		if (!panels[7].isUnmatched(panels[0], panels[1], panels[2], panels[3],
			panels[4], panels[5], panels[6])) {
			panels[7].unmatch();
		}
	}

	const panels = [
		new Panel(),
		new Panel(),
		new Panel(),
		new Panel(),
		new Panel(),
		new Panel(),
		new Panel(),
		new Panel(),
	];

	let panelsLeft = 8;

	const spin = document.getElementById('spin');
	spin.addEventListener('click', () => {
		if (spin.classList.contains('inactive')) {
			return;
		}
		spin.classList.add('inactive');
		panels.forEach(panel => {
			panel.activate();
			panel.spin();
		});
	});
}