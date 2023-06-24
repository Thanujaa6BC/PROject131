Status = "";
AC_image = "";
object = [];

function preload() {
    AC_image = loadImage("AC.jpeg");
}

function setup() {
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML = "Statuss : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    Status = true;
    object_detector.Detect(AC_image, gotResults);

}

function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    objects = results;
  }

function draw() {
    image(AC_image,0,0);
    if(Status != ""){
        for(i=0; i< objects.length; i++){
            document.getElementById("Status").innerHTML = "Status: Objects Detected";

            fill("#FF0000");
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
         noFill();
         stroke("#FF0000");
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}