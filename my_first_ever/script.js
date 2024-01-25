var topics = ["HTML", "CSS", "Git", "JavaScript"];

var randomTopic = topics[Math.floor(Math.random() * topics.length)];

function listTopics(){
    for (let x = 0; x < topics.length; x++){
        console.log(topics[x])
    }
}

function selectTopic(){
    if (randomTopic === "HTML"){
        console.log("Lets study HTML!");
    }else if (randomTopic === "CSS"){
        console.log("Lets study CSS!");
    }else if (randomTopic === "Git"){
        console.log("Lets study Git!");
    }else if (randomTopic === "JavaScript"){
        console.log("Lets study JavaScript!");
    }else {
        console.log("Please try again!");
    }
}
console.log('Here are the topics we learned through Prework:');
listTopics();
console.log('Which topic should we study first?');
selectTopic();