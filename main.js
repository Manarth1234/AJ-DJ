song = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X= " + leftWristX + "Left Wrist Y" + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X= " + rightWristX + "Right Wrist Y" + rightWristY);
    }
}
function modelLoaded() {
    console.log("Model Loaded!");
}
function draw() {
    image(video,0,0,600,500);

    fill("red");
    stroke("red");
   
    
    if(scoreRightWrist > 0.2) {
        circle(rightWristX,rightWristY,20);
        InNumberRightWristY = Number(rightWristY);
        remove_decimals = floor(InNumberRightWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume : " + volume;
        song.setVolume(volume);
    }

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);
        if (leftWristY > 0 && leftWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed : 0.5x";
            song.rate(0.5);
        } 
        if (leftWristY > 100 && leftWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed : 1x";
            song.rate(1);
        }
        if (leftWristY > 200 && leftWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed : 1.5x";
            song.rate(1.5);
        }  
        if (leftWristY > 300 && leftWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed : 2.0x";
            song.rate(2);
        } 
        if (leftWristY > 400) {
            document.getElementById("speed").innerHTML = "Speed : 2.5x";
            song.rate(2.5);
        } 
    }


}
function start_play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function pause() {
    song.pause();
}