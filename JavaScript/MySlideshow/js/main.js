'use strict'

{
	const images = [
		'img/pic00.png',
		'img/pic01.png',
		'img/pic02.png',
		'img/pic03.png',
		'img/pic04.png',
		'img/pic05.png',
		'img/pic06.png',
		'img/pic07.png',
	];
	let currentIndex = 0;

	// メイン画像
	const mainImage = document.getElementById('main');
	mainImage.src = images[currentIndex];

	// サムネ画像
	images.forEach((image, index) => {
		const img = document.createElement('img');
		img.src = image;
		
		const li = document.createElement('li');
		if(index === currentIndex) {
			li.classList.add('current');
		}
		li.addEventListener('click', () => {
			mainImage.src = image;
			// サムネの移動
			const thumbnails = document.querySelectorAll('.thumbnails > li');
			thumbnails[currentIndex].classList.remove('current');
			currentIndex = index;
			thumbnails[currentIndex].classList.add('current');
		});
		
		li.appendChild(img);
		document.querySelector('.thumbnails').appendChild(li);
	});

	// 次へボタン
	const next = document.getElementById('next');
	next.addEventListener('click', () => {
		let target = currentIndex + 1;
		if (target === images.length) {
			target = 0;
		}
		document.querySelectorAll('.thumbnails > li')[target].click();
	});
	
	// 前へボタン
	const prev = document.getElementById('prev');
	prev.addEventListener('click', () => {
		let target = currentIndex - 1;
		if (target < 0) {
			target = images.kength - 1;
		}
		document.querySelectorAll('.thumbnails > li')[target].click();
	});

	let timeoutId;

	// スラーイドショー再生
	function playSlideshow() {
		timeoutId = setTimeout(() => {
			next.click();
			playSlideshow();
		}, 1000);
	}

	let isPlaying = false;

	const play = document.getElementById('play');
	play.addEventListener('click', () => {
		if (isPlaying === false) {
			playSlideshow();
			play.textContent = 'Pause';
		} else {
			clearTimeout(timeoutId);
			lay.textContent = 'Play';
		}
		isPlaying = !isPlaying;
	});
}