// Grab some stuff
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");

let playerLives = 20;

// Linnk text from html 
playerLivesCount.textContent = playerLives


//Generate data (images and names) 
//for the cards - an array of multiple objects



const getData = () => [
	{imgSrc: "img_game/01_1_whale.jpeg", id: 1, name: "whale" },
	{imgSrc: "img_game/01_2_whale copy.jpg", id: 2, name: "whale" },
	{imgSrc: "img_game/02_1_coin.jpeg", id: 3, name: "coin" },
	{imgSrc: "img_game/02_2_coin.jpeg", id: 4, name: "coin" },
	{imgSrc: "img_game/03_01_tea.jpeg", id: 5, name: "tea" },
	{imgSrc: "img_game/03_2_tea.jpeg", id: 6, name: "tea" },
	{imgSrc: "img_game/13_portugal.jpeg", id: 7, name: "portugal" },
	{imgSrc: "img_game/13_portugal2.jpeg", id: 8, name: "portugal" },
	{imgSrc: "img_game/05_1_42.jpeg", id: 9, name: "42" },
	{imgSrc: "img_game/05_2_42.png", id: 10, name: "42" },
	{imgSrc: "img_game/06_1sisy.jpeg", id: 11, name: "sisy" },
	{imgSrc: "img_game/06_2sisy.jpeg", id: 12, name:"sisy" },
	{imgSrc: "img_game/07_lsd1.jpeg", id: 13, name: "lsd" },
	{imgSrc: "img_game/07_lsd2.jpeg", id: 14, name: "lsd" },
	{imgSrc: "img_game/08_1_kitkat.jpeg", id: 15, name: "kitkat" },
	{imgSrc: "img_game/08_2_kitkat.png", id: 16, name: "kitkat" },
	{imgSrc: "img_game/09_1_bvg.png", id: 17, name: "bvg" },
	{imgSrc: "img_game/09_2_bvg.jpeg", id: 18, name: "bvg" },
	{imgSrc: "img_game/10_1_musk.jpeg", id: 19, name: "mask" },
	{imgSrc: "img_game/10_2_musk.jpeg", id: 20, name: "mask" },
	{imgSrc: "img_game/11_Ham.jpeg", id: 21, name: "formula" },
	{imgSrc: "img_game/11_ver.jpeg", id: 22, name: "formula" },
	{imgSrc: "img_game/12_1_beatles.jpeg", id: 23, name: "beatles" }, 
	{imgSrc: "img_game/12_2_beatles.jpeg", id: 24, name: "beatles" },
	{imgSrc: "img_game/77_hott.jpeg", id: 25, name: "hot" },
	{imgSrc: "img_game/77_hotfire.jpeg", id: 26, name: "hot" },
	{imgSrc: "img_game/45_bob.png", id: 27, name: "bob" },
	{imgSrc: "img_game/45_nobob.jpeg", id: 28, name: "bob" },
	{imgSrc: "img_game/33_macaroni.jpeg", id: 29, name: "food" }, 
	{imgSrc: "img_game/33_dessert.jpeg", id: 30, name: "food" }, 
	{imgSrc: "img_game/14_mateberlin.jpeg", id: 31, name: "mate" },
	{imgSrc: "img_game/14_mateargentina.jpeg", id: 32, name: "mate" },
	{imgSrc: "img_game/35_noshoes.jpeg", id: 33, name: "omg" },
	{imgSrc: "img_game/35_shoes.jpeg", id: 34, name: "omg" },
	{imgSrc: "img_game/69dondon.jpeg", id: 35, name: "sweet" }, 
	{imgSrc: "img_game/69donut.jpeg", id: 36, name: "sweet" },

];

const data = getData();


//randomize

const randomize = () => {
	const cardData = getData();
	cardData.sort(() => Math.random() - 0.5);
	return cardData; 

};


//cards generation 

const cardGenerator = () => {
	const cardData = randomize();

//generate HTML for 
cardData.forEach((item) => {
	const card = document.createElement("div");
const face = document.createElement("img");
const back = document.createElement("div");
card.classList = "card";
face.classList = "face";
back.classList = "back";
// attach info to the cards
face.src = item.imgSrc;
card.setAttribute("name", item.name);
// attach the cards (to have on the screen)
section.appendChild(card);
card.appendChild(face);
card.appendChild(back);

card.addEventListener("click", (e) => {
	card.classList.toggle("toggleCard");
	checkCards(e);
	});
  });
};

//check the cards
const checkCards = (e) => {
	console.log(e);
	const clickedCard = e.target;
	clickedCard.classList.add("flipped");
	const flippedCards = document.querySelectorAll(".flipped");
	const toggleCard = document.querySelectorAll(".toggleCard");
		console.log(flippedCards);
	
//Logic! Magic!
//check flipped cards - if the names match

	if (flippedCards.length === 2) {
		if (
			flippedCards[0].getAttribute("name") === 
			flippedCards[1].getAttribute("name")
		) {
			console.log("match");
			playerLives++;
			playerLivesCount.textContent = playerLives;


			flippedCards.forEach(card => {
				card.classList.remove("flipped"); 
//unclickable
				card.style.pointerEvents = "none";
// ADD вспылвающее окно  
//объяснение matching relationship 
			});
		} else {
			console.log("wrong");
			flippedCards.forEach(card => {
				card.classList.remove("flipped"); 
				setTimeout(() => card.classList.remove("toggleCard"), 1400);
			});
// every time we are wrong
//take one off from the lives and update the ui 
			playerLives--;
			playerLivesCount.textContent = playerLives;
//need to do a check 
			if(playerLives === 0){
				restart("/ᐠ. ｡.ᐟ\ᵐᵉᵒʷˎˊ˗ The failure is not fatal! The courage to continue is what counts! Amen");
			}
		}
	}
//how to know if we won the game?
//run a check 

if(toggleCard.length === 36){
	restart("You won!(ᴖᴥᴖ)")
}

};
			
// Restart 
//equal to an array function
//need to create a  function to reset when we hit 0 

const restart  = (text) => {
	let cardData = randomize();
	let faces = document.querySelectorAll(".face");
	let cards = document.querySelectorAll(".card");
	section.style.pointerEvents = "none";
	cardData.forEach((item,index) => {
//if we lose flip all the cards back
		cards[index].classList.remove("toggleCard");
//randomize
		setTimeout(()=> {
			cards[index].style.pointerEvents = "all"; 
			faces[index].src = item.imgSrc;
// names in elements match the image essence
//delay flipping after loosing 
			cards[index].setAttribute("name", item.name);
			section.style.pointerEvents = "all";
		}, 1000);
	});
	playerLives = 20;
//update the ui again
	playerLivesCount.textContent = playerLives;
	setTimeout(() => window.alert(text), 100);

}; 

cardGenerator();


 