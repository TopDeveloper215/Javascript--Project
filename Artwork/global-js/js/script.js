function removePlaceholder(canvas, id) {
    canvas.forEachObject(function(obj) {
        if (obj.id && obj.id === id) canvas.remove(obj);
    });
}

var handleUpload = function(event) {
    showImg(event.target.files[0], config);
};

function deleteSelected(){
    if(canvas.getActiveObject().id == "groupArtwork"){
        canvas.remove(canvas.getActiveObject());
    }
}

function addArtwork(){
    var up = document.getElementById("uploadImg");
    up.click();
}

function getColor(){
    var color = document.getElementById("vcolorful").color;

    objectsArr = canvas.getObjects();

    const walls = objectsArr.filter(item => item.id == "wall");

    for(var i = 0 ; i <= walls.length ; i++){
        canvas.setActiveObject(walls[i]);
        canvas.getActiveObject(canvas).set('fill', color);
    }

    canvas.renderAll();
}

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

function openWallNav() {
  document.getElementById("myWallSidebar").style.height = "50px";
  // document.getElementById("main").style.marginRight = "50px";
}

function closeWallNav() {
  document.getElementById("myWallSidebar").style.height = "0";
  // document.getElementById("main").style.marginRight = "0";
}

// Generate a color pallete
function generateColorPallete(img){
  const data = getImageData();

}


function showImg(pho, config){

   url[n] = pho;
   var ur= URL.createObjectURL(pho);

 

  frameFlag = 0;

  fabric.Image.fromURL(ur, function(img){

      img.hasControls = false;
      removePlaceholder(canvas, 'placeholder');
   
      img.id = "artwork"+n;
      img.top = config.height * 0.2;
      img.left = config.width * 0.3;
      img.stroke="white";
      img.strokeWidth = 0;
      img.borderColor = "blue";
      img.borderScaleFactor = 2;
      img.scaleToHeight(500);

        // img.shadow =  new fabric.Shadow({
        //     color: 'rgba(0,0,0,0.3)',
        //     blur: 15,
        //     offsetX: -20,
        //     offsetY: 20,
        //     nonScaling: true
        // })
        n++;
        artWorkTop = img.top;
        artWorkLeft = img.left;
        artWorkHeight = img.height*img.scaleY;
        artWorkWidth = img.width*img.scaleX;
      if(dimensFlag==0) {
        $("#wd").val(artWorkWidth);
        $("#hd").val(artWorkHeight);
        $("#thickness").val(40);
        $(".dimen").val(parseInt(artWorkWidth) +"X" + parseInt(artWorkHeight));}
      else {
        $("#wd").val(artWorkWidth/2.54);
        $("#hd").val(artWorkHeight/2.54);
        $("#thickness").val(40/2.54);
        $(".dimen").val(parseInt(artWorkWidth/2.54) +"X" + parseInt(artWorkHeight/2.54));
        $("#thickness").val(thickFrame/2.54);
      }

        //insert the image to canvas
        
        if(printFlag ==1){
          printFlag = 0;
          
        }

       var urlTop = "../frames/" + frameUrl + "/top.jpg";
       var urlRight = "../frames/" + frameUrl + "/right.jpg";
       var urlBottom = "../frames/" + frameUrl + "/bottom.jpg";
       var urlLeft = "../frames/" + frameUrl + "/left.jpg";
   
         fabric.Image.fromURL(urlTop, function(img1){
   
               var poly1 = new fabric.Polyline([
                   { x: thickFrame, y: thickFrame },
                   { x: thickFrame+artWorkWidth, y: thickFrame },
                   { x: thickFrame+artWorkWidth+thickFrame, y: 0},
                   { x: 0, y: 0 },
                   { x: thickFrame, y: thickFrame }
               ], {
               left: artWorkLeft - thickFrame,
               top: artWorkTop - thickFrame,
               });
    
               var pattern1 = new fabric.Pattern({source: img1.getElement(), offsetX: -20, offsetY: -50});
               poly1.set({       
                   id:frameUrl,     
                 fill: pattern1,
               });

              fabric.Image.fromURL(urlRight, function(img2){
    
                  var poly2 = new fabric.Polyline([
                      { x: 0, y: 0 },
                      { x: 0, y: artWorkHeight },
                      { x: thickFrame, y: artWorkHeight + thickFrame},
                      { x: thickFrame, y: - thickFrame },
                      { x: 0, y: 0 }
                  ], {
                  left: artWorkLeft + artWorkWidth,
                  top: artWorkTop - thickFrame,
                  });
          
                  var pattern2 = new fabric.Pattern({source: img2.getElement(), offsetX: -20, offsetY: -50});
                  poly2.set({       
                      id:"frames",     
                    fill: pattern2,
                  });
                                    
                  fabric.Image.fromURL(urlBottom, function(img3){
                    
                          var poly3 = new fabric.Polyline([
                              { x: 0, y: 0 },
                              { x: -thickFrame, y: thickFrame },
                              { x: artWorkWidth+thickFrame, y:  thickFrame},
                              { x: artWorkWidth, y: 0 },
                              { x: 0, y: 0 }
                          ], {
                          left: artWorkLeft - thickFrame,
                          top: artWorkTop + artWorkHeight,
                          });

                          var pattern3 = new fabric.Pattern({source: img3.getElement(), offsetX: -20, offsetY: -50});
                          poly3.set({       
                              id:"frames",     
                            fill: pattern3,
                          });

                            fabric.Image.fromURL(urlLeft, function(img4){
                              
                              var poly4 = new fabric.Polyline([
                                  { x: 0, y: 0 },
                                  { x: -thickFrame, y: -thickFrame },
                                  { x: -thickFrame, y: artWorkHeight + thickFrame},
                                  { x: 0, y: artWorkHeight },
                                  { x: 0, y: 0 }
                              ], {
                              left: artWorkLeft - thickFrame,
                              top: artWorkTop - thickFrame,
                              });
                      
                              var pattern4 = new fabric.Pattern({source: img4.getElement()});
                              poly4.set({       
                                  id:"frames",     
                                fill: pattern4,
                                borderWidth : 0,
                              });

                              var group = new fabric.Group([img, poly1, poly2, poly3, poly4 ], {left:artWorkLeft, top:artWorkTop});
                              group.hasControls = false;
                              group.hasBorder = true;
                              group.borderColor = "blue";
                              group.borderWidth = 5;
                              group.id = "groupArtwork";

                              canvas.insertAt(group, 2);

                          });
                  });
                });
              });

        if(printFlag ==1){
        img.set("scaleX", (artWorkWidth-2*innerthickFrame)/img.width);
        img.set("scaleY", (artWorkHeight-2*innerthickFrame)/img.height);
        img.top = artWorkTop + innerthickFrame;
        img.left = artWorkLeft + innerthickFrame;
        }

        canvas.renderAll();

  }, 
  {crossOrigin: 'anonymous'}
  )
  }

  function takeScreenshot(){
    var data = canvas.toDataURL();
  }



