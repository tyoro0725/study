'use strict'

{
	const images = [
		'img/pants01.jpg',
		'img/pants02.jpg',
		'img/pants03.jpg',
		'img/pants04.jpg',
		'img/pants05.jpg',
		'img/pants06.jpg',
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
			target = images.length - 1;
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
			play.textContent = 'Play';
		}
		isPlaying = !isPlaying;
	});
}