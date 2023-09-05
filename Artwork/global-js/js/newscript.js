
$(".frame2").click(()=>{

    if($(".frame2").val()==1) {
        $(".pattern").show();
        $(".frame2").val(2);
    }
    else {$(".frame2").val()==2
        $(".pattern").hide();
        $(".frame2").val(1);
    }
});

$(".inpat").click(()=>{

    if($(".inpat").val()==1) {
        $(".innerpattern").show();
        $(".inpat").val(2);
    }
    else {$(".inpat").val()==2
        $(".innerpattern").hide();
        $(".inpat").val(1);
    }
});

$("#p1").click(()=>{
    $(".pattern").css("border-width","1px");
    $("#p1").css("border-width","5px")
    frameUrl = 1;   
    var ao = canvas.getActiveObject();
    if(ao.id == "groupArtwork"){
        if(printFlag == 0)
        {ao.remove(ao._objects[1],ao._objects[2], ao._objects[3], ao._objects[4]);}
        else {
            ao.remove(ao._objects[2],ao._objects[3], ao._objects[4], ao._objects[5]);
        }
        addFrame(ao);
    }
});

$("#p2").click(()=>{
    $(".pattern").css("border-width","1px");
    $("#p2").css("border-width","5px");
    frameUrl = 2;
    var ao = canvas.getActiveObject();
    if(ao.id == "groupArtwork"){
        if(printFlag == 0)
        {ao.remove(ao._objects[1],ao._objects[2], ao._objects[3], ao._objects[4]);}
        else {
            ao.remove(ao._objects[2],ao._objects[3], ao._objects[4], ao._objects[5]);
        }
        addFrame(ao);
    }
});

$("#p3").click(()=>{
    $(".pattern").css("border-width","1px");
    $("#p3").css("border-width","5px");
    frameUrl = 3;
    var ao = canvas.getActiveObject();
    if(ao.id == "groupArtwork"){
        if(printFlag == 0)
        {ao.remove(ao._objects[1],ao._objects[2], ao._objects[3], ao._objects[4]);}
        else {
            ao.remove(ao._objects[2],ao._objects[3], ao._objects[4], ao._objects[5]);
        }
        addFrame(ao);
    }
});

$("#p4").click(()=>{
    $(".pattern").css("border-width","1px");
    $("#p4").css("border-width","5px");
    frameUrl = 4;
    var ao = canvas.getActiveObject();
    if(ao.id == "groupArtwork"){
        if(printFlag == 0)
        {ao.remove(ao._objects[1],ao._objects[2], ao._objects[3], ao._objects[4]);}
        else {
            ao.remove(ao._objects[2],ao._objects[3], ao._objects[4], ao._objects[5]);
        }
        addFrame(ao);
    }
});

$("#p5").click(()=>{
    $(".pattern").css("border-width","1px");
    $("#p5").css("border-width","5px");
    frameUrl = 5;
    var ao = canvas.getActiveObject();
    if(ao.id == "groupArtwork"){
        if(printFlag == 0)
        {ao.remove(ao._objects[1],ao._objects[2], ao._objects[3], ao._objects[4]);}
        else {
            ao.remove(ao._objects[2],ao._objects[3], ao._objects[4], ao._objects[5]);
        }
        addFrame(ao);
    }
});

$("#ip1").click(()=>{
    $(".innerpattern").css("border-width","1px");
    $("#ip1").css("border-width","5px")
    innerframeUrl = 1;
    var ao = canvas.getActiveObject();
    if(ao.id == "groupArtwork"){
        if(printFlag == 1)
       { ao.remove(ao._objects[0]);
        addInnerFrame(ao);}
    }
});

$("#ip2").click(()=>{
    $(".innerpattern").css("border-width","1px");
    $("#ip2").css("border-width","5px");
    innerframeUrl = 2;
    var ao = canvas.getActiveObject();
    if(ao.id == "groupArtwork"){
        if(printFlag == 1)
       {   
        ao.remove(ao._objects[0]);
        addInnerFrame(ao);}
    }
});

$("#ip3").click(()=>{
    $(".innerpattern").css("border-width","1px");
    $("#ip3").css("border-width","5px");
    innerframeUrl = 3;
    var ao = canvas.getActiveObject();
    if(ao.id == "groupArtwork"){
        if(printFlag == 1)
       { ao.remove(ao._objects[0]);
        addInnerFrame(ao);}
    }
});

$("#ip4").click(()=>{
    $(".innerpattern").css("border-width","1px");
    $("#ip4").css("border-width","5px");
    innerframeUrl = 4;
    var ao = canvas.getActiveObject();
    if(ao.id == "groupArtwork"){
        if(printFlag == 1)
       { ao.remove(ao._objects[0]);
        addInnerFrame(ao);}
    }
});

$("#ip5").click(()=>{
    $(".innerpattern").css("border-width","1px");
    $("#ip5").css("border-width","5px");
    innerframeUrl = 5;
    var ao = canvas.getActiveObject();
    if(ao.id == "groupArtwork"){
        if(printFlag == 1)
       { ao.remove(ao._objects[0]);
        addInnerFrame(ao);}
    }
});

$("#ip6").on("click", ()=>{
    $(".innerpattern").css("border-width","1px");
   $("#ip6").css("border-width","5px");
   innerframeUrl = 6;
   var ao = canvas.getActiveObject();
   if(ao.id == "groupArtwork"){
       if(printFlag == 1)
      { ao.remove(ao._objects[0]);
       addInnerFrame(ao);}
   }

})
// $("#p6").click(()=>{
//     $(".pattern").css("border-width","1px");
//     $("#p6").css("border-width","5px");
//     frameUrl = 6;
//     addFrame();
// });


$(".frame1").click(()=>{
    if(frameFlag==0){
         
        $(".frame1").html("Apply Frame");
        var ao = canvas.getActiveObject();
        if(ao.id == "groupArtwork"){
            if(printFlag == 0)
          {
            ao.remove(ao._objects[1],ao._objects[2], ao._objects[3], ao._objects[4]);
            canvas.renderAll();
           }
           else {
            ao.remove(ao._objects[0],ao._objects[2], ao._objects[3], ao._objects[4],ao._objects[5]);
            canvas.renderAll();
           }
           frameFlag = 1;
        }
       
    }
    else{
        
        $(".frame1").html("Cancel Frame");
        var ao = canvas.getActiveObject();
        if(ao.id == "groupArtwork"){
        if(printFlag == 0)
       { addFrame(ao);}
       else {
        addInnerFrame(ao);
        addFrame(ao);
       }
       frameFlag = 0;
        }
    }        
});

$("#thickness").on("change",()=>{

    if($("#thickness").val()!=""){
       // removePlaceholder(canvas,"frames");
        if(dimensFlag==0){
          thickFrame = Number($("#thickness").val());
        }
        else{
          thickFrame = Number($("#thickness").val())*2.54; 
        }

        var ao = canvas.getActiveObject();
        if(ao.id == "groupArtwork"){
            ao.remove(ao._objects[1],ao._objects[2], ao._objects[3], ao._objects[4]);
            addFrame(ao);
        }
    }
});

$("#innerthick").on("change",()=>{

    if($("#innerthick").val()!=""){

        if(dimensFlag==0){
            innerthickFrame = Number($("#innerthick").val());
        }
        else{
            innerthickFrame = Number($("#innerthick").val())*2.54; 
        }
        var ao = canvas.getActiveObject();
        if(ao.id == "groupArtwork"){
            ao.remove(ao._objects[0], ao._objects[2], ao._objects[3], ao._objects[4], ao._objects[5]);
            addInnerFrame(ao);
            addFrame(ao);
            
        }
    }
});

$(".link").on("click",()=>{
    if(lockFlag == 0) {
        lockFlag = 1;
        $(".link").html("unLinked");
    }
    else {
        lockFlag = 0;
        $(".link").html("Linked");
    }
})

$(".select2").change(()=>{

    if($(".select2").val()=="cm")
    {
        dimensFlag = 0;
        $("#wd").val($("#wd").val()*2.54);
        $("#hd").val($("#hd").val()*2.54);
        $(".dimen").val(parseInt(Number($("#wd").val())) + "X" + parseInt(Number($("#hd").val())));
        $("#thickness").val($("#thickness").val()*2.54);
        $("#innerthick").val($("#innerthick").val()*2.54);
    }
    else{
        dimensFlag = 1;
        $("#wd").val($("#wd").val()/2.54);
        $("#hd").val($("#hd").val()/2.54);
        $(".dimen").val(parseInt(Number($("#wd").val())) + "X" + parseInt(Number($("#hd").val())));
        $("#thickness").val($("#thickness").val()/2.54);
        $("#innerthick").val($("#innerthick").val()/2.54);
    }
  });

  $(".select1").change(()=>{

    if($(".select1").val()=="paint")
    {
        printFlag = 0;
        $("#inner").css("display","none");
        $("#outer").css("display","inline");

        var ao = canvas.getActiveObject();
        if(ao.id == "groupArtwork"){
            ao.remove(ao._objects[0],ao._objects[2],ao._objects[3], ao._objects[4], ao._objects[5]);    
            addFrame(ao);
        }
    }
    else{
        printFlag = 1;
        $("#outer").css("display","none");
        $("#inner").css("display","inline");

        if(dimensFlag==0){
            innerthickFrame = Number($("#innerthick").val());
        }
        else{
            innerthickFrame = Number($("#innerthick").val())*2.54; 
        }

        var ao = canvas.getActiveObject();
        if(ao.id == "groupArtwork"){

            ao.remove(ao._objects[1],ao._objects[2], ao._objects[3], ao._objects[4]);
            
            addInnerFrame(ao);
            addFrame(ao);
        }
    }
  });

  $("#ip6").on("focus", ()=>{
    var interval = setInterval(() => {
       
        var ao = canvas.getActiveObject();
        if(ao.id == "groupArtwork"){
            if (printFlag ==1) 
            {
                ao._objects[0].set("fill",  $("#ip6").val());
                canvas.renderAll();
            }
        };
    }, 20);

  $("#ip6").on("focusout", ()=>{
    clearInterval(interval);
  })
});


$("#wd").change(()=>{
    if(dimensFlag==0){
        var val = Number($("#wd").val());
    }
    else{
        var val = Number($("#wd").val())*2.54;
    }
    if(lockFlag == 0){
        var ao = canvas.getActiveObject();
        if(ao.id == "groupArtwork"){
           
            artWorkWidth = val;
           
   
                 if(printFlag==0){ 
                    artWorkHeight =artWorkWidth/ (ao._objects[0].width/ao._objects[0].height);
                    ao.remove(ao._objects[1],ao._objects[2], ao._objects[3], ao._objects[4]);
                    ao._objects[0].set("scaleX", artWorkWidth/ao._objects[0].width);
                    ao._objects[0].set("scaleY", artWorkHeight/ao._objects[0].height);
                    ao._objects[0].set("left", -artWorkWidth/2);
                    ao._objects[0].set("top", -artWorkHeight/2);
                 }

                 else {
                    artWorkHeight =artWorkWidth/ (ao._objects[1].width/ao._objects[1].height);
                        ao.remove(ao._objects[0], ao._objects[2], ao._objects[3], ao._objects[4], ao._objects[5]);
                        ao._objects[0].set("scaleX", artWorkWidth/ao._objects[0].width);
                        ao._objects[0].set("scaleY", artWorkHeight/ao._objects[0].height);
                        ao._objects[0].set("left", -artWorkWidth/2);
                        ao._objects[0].set("top", -artWorkHeight/2);
                        addInnerFrame(ao);

                    }
                addFrame(ao);
                
                 $("#hd").val( Number($("#wd").val())/(ao._objects[0].width/ao._objects[0].height));
                $(".dimen").val(parseInt(Number($("#wd").val())) +"X" + parseInt(Number($("#hd").val())));
            }
    }
    else {
        artWorkWidth = val;

                if(printFlag==0){              
                    var ao = canvas.getActiveObject();
                    if(ao.id == "groupArtwork"){

                        var id = ao._objects[0].id;
                        var num = Number(id.slice(7,8));
                        var newurl = URL.createObjectURL(url[num]);

                        ao.remove(ao._objects[0], ao._objects[1],ao._objects[2], ao._objects[3], ao._objects[4]);

                         fabric.Image.fromURL(newurl, function(img){
                            img.id = "artwork"+num;
                            img.top = - artWorkHeight/2;
                            img.left = -artWorkWidth/2;;

                            if((artWorkWidth/artWorkHeight) >=  (img.width/img.height)){
                                img.scaleToWidth(artWorkWidth);           
                                img.cropY = ((img.height*img.scaleY-artWorkHeight)/2)/img.scaleY;
                                img.height = artWorkHeight/img.scaleY;       
                            }

                            else{
                                img.scaleToHeight(artWorkHeight);
                                img.cropX = ((img.width*img.scaleX-artWorkWidth)/2)/img.scaleX;
                                img.width = artWorkWidth/img.scaleX;
                            }

                              ao.insertAt(img,1);
                              addFrame(ao);                
                        }, 
                        {crossOrigin: 'anonymous'}
                        )
                    }

                }
                else {
                    var ao = canvas.getActiveObject();
                    if(ao.id == "groupArtwork"){

                        var id = ao._objects[1].id;
                        var num = Number(id.slice(7,8));
                        var newurl = URL.createObjectURL(url[num]);

                        ao.remove(ao._objects[0], ao._objects[1],ao._objects[2], ao._objects[3], ao._objects[4], ao._objects[5]);

                         fabric.Image.fromURL(newurl, function(img){
                            img.id = "artwork"+num;
                            img.top = - artWorkHeight/2;
                            img.left = -artWorkWidth/2;

                            if((artWorkWidth/artWorkHeight) >=  (img.width/img.height)){
                                img.scaleToWidth(artWorkWidth);           
                                img.cropY = ((img.height*img.scaleY-artWorkHeight)/2)/img.scaleY;
                                img.height = artWorkHeight/img.scaleY;       
                            }

                            else{
                                img.scaleToHeight(artWorkHeight);
                                img.cropX = ((img.width*img.scaleX-artWorkWidth)/2)/img.scaleX;
                                img.width = artWorkWidth/img.scaleX;
                            }

                              ao.insertAt(img,1);
                              addInnerFrame(ao);
                              addFrame(ao);
                    
                        }, 
                        {crossOrigin: 'anonymous'}
                        )
                    }
                   
                }
                $(".dimen").val(parseInt(Number($("#wd").val())) +"X" + parseInt(Number($("#hd").val())));
    }

});

$("#hd").change(()=>{
    if(dimensFlag==0){
       var val = Number($("#hd").val());
    }
    else {
       var val = Number($("#hd").val())*2.54;
    }
    if(lockFlag == 0){
        var ao = canvas.getActiveObject();
        if(ao.id == "groupArtwork"){

                artWorkHeight = val;

                if(printFlag==0){
                artWorkWidth =artWorkHeight/ (ao._objects[0].height/ao._objects[0].width);
                ao.remove(ao._objects[1],ao._objects[2], ao._objects[3], ao._objects[4]);
                ao._objects[0].set("scaleX", artWorkWidth/ao._objects[0].width);
                ao._objects[0].set("scaleY", artWorkHeight/ao._objects[0].height);
                ao._objects[0].set("left", -artWorkWidth/2);
                ao._objects[0].set("top", -artWorkHeight/2);
                }
                else {
                    artWorkWidth =artWorkHeight/ (ao._objects[1].height/ao._objects[1].width);
                    ao.remove(ao._objects[0],ao._objects[2], ao._objects[3], ao._objects[4],ao._objects[5]);
                    ao._objects[0].set("scaleX", artWorkWidth/ao._objects[0].width);
                    ao._objects[0].set("scaleY", artWorkHeight/ao._objects[0].height);
                    ao._objects[0].set("left", -artWorkWidth/2);
                    ao._objects[0].set("top", -artWorkHeight/2);
                    addInnerFrame(ao);
                 }

                addFrame(ao);             

                $("#wd").val(Number($("#hd").val())/(ao._objects[0].height/ao._objects[0].width));
                $(".dimen").val(parseInt(Number($("#wd").val())) +"X" + parseInt(Number($("#hd").val())));
         }
    }
    else {
                artWorkHeight = val;
                if(printFlag==0){
                    var ao = canvas.getActiveObject();
                    if(ao.id == "groupArtwork"){

                        var id = ao._objects[0].id;
                        var num = Number(id.slice(7,8));
                        var newurl = URL.createObjectURL(url[num]);

                        ao.remove(ao._objects[0], ao._objects[1],ao._objects[2], ao._objects[3], ao._objects[4]);

                         fabric.Image.fromURL(newurl, function(img){
                            img.id = "artwork"+num;
                            img.top = - artWorkHeight/2;
                            img.left = -artWorkWidth/2;;

                            if((artWorkWidth/artWorkHeight) >=  (img.width/img.height)){
                                img.scaleToWidth(artWorkWidth);           
                                img.cropY = ((img.height*img.scaleY-artWorkHeight)/2)/img.scaleY;
                                img.height = artWorkHeight/img.scaleY;       
                            }

                            else{
                                img.scaleToHeight(artWorkHeight);
                                img.cropX = ((img.width*img.scaleX-artWorkWidth)/2)/img.scaleX;
                                img.width = artWorkWidth/img.scaleX;
                            }

                              ao.add(img);
                              addFrame(ao);
                    
                        }, 
                        {crossOrigin: 'anonymous'}
                        )
                    }
                }
                else {
                
                    var ao = canvas.getActiveObject();
                    if(ao.id == "groupArtwork"){

                        var id = ao._objects[1].id;
                        var num = Number(id.slice(7,8));
                        var newurl = URL.createObjectURL(url[num]);

                        ao.remove(ao._objects[0], ao._objects[1],ao._objects[2], ao._objects[3], ao._objects[4], ao._objects[5]);

                         fabric.Image.fromURL(newurl, function(img){
                            img.id = "artwork"+num;
                            img.top = - artWorkHeight/2;
                            img.left = -artWorkWidth/2;;

                            if((artWorkWidth/artWorkHeight) >=  (img.width/img.height)){
                                img.scaleToWidth(artWorkWidth);           
                                img.cropY = ((img.height*img.scaleY-artWorkHeight)/2)/img.scaleY;
                                img.height = artWorkHeight/img.scaleY;       
                            }

                            else{
                                img.scaleToHeight(artWorkHeight);
                                img.cropX = ((img.width*img.scaleX-artWorkWidth)/2)/img.scaleX;
                                img.width = artWorkWidth/img.scaleX;
                            }

                              ao.insertAt(img,1);
                              addInnerFrame(ao);
                              addFrame(ao);
                    
                        }, 
                        {crossOrigin: 'anonymous'}
                        )
                    }
                }
                $(".dimen").val(parseInt(Number($("#wd").val())) +"X" + parseInt(Number($("#hd").val())));
            }
});


function deselectall(event){
    if(event.target===finish[0]){

        canvas.forEachObject(function(obj) {
            obj.selectable = false;
            obj.hasBorders = false;
            canvas.renderAll();
            canvas.discardActiveObject();
            obj.selectable = true;
            obj.hasBorders = true;
        })
    }      
}
// apply frames

function addFrame(reobj){

    

    var urlTop = "../frames/" + frameUrl + "/top.jpg";
    var urlRight = "../frames/" + frameUrl + "/right.jpg";
    var urlBottom = "../frames/" + frameUrl + "/bottom.jpg";
    var urlLeft = "../frames/" + frameUrl + "/left.jpg";

    if(printFlag == 0)
    {
      fabric.Image.fromURL(urlTop, function(img1){

            var poly1 = new fabric.Polyline([
                { x: thickFrame, y: thickFrame },
                { x: thickFrame+artWorkWidth, y: thickFrame },
                { x: thickFrame+artWorkWidth+thickFrame, y: 0},
                { x: 0, y: 0 },
                { x: thickFrame, y: thickFrame }
            ], {
                left: -(artWorkWidth/2 + thickFrame),
                top: -(artWorkHeight/2 + thickFrame)
            });
 
            var pattern1 = new fabric.Pattern({source: img1.getElement(), offsetX: 0, offsetY: 0});
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
               left: artWorkWidth/2,
               top: -(artWorkHeight/2 + thickFrame)
               });
       
               var pattern2 = new fabric.Pattern({source: img2.getElement(), offsetX: 0, offsetY: 0});
               poly2.set({       
                   id:frameUrl,     
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
                       left: -(artWorkWidth/2 + thickFrame),
                       top: artWorkHeight/2,
                       });

                       var pattern3 = new fabric.Pattern({source: img3.getElement(), offsetX: 0, offsetY: 0});
                       poly3.set({       
                           id:frameUrl,     
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
                            left: -(artWorkWidth/2 + thickFrame),
                            top: -(artWorkHeight/2 + thickFrame)
                           });
                   
                           var pattern4 = new fabric.Pattern({source: img4.getElement(), offsetX: 0, offsetY: 0});
                           poly4.set({       
                               id:frameUrl,     
                             fill: pattern4,
                           });

                           reobj.add(poly1, poly2, poly3, poly4);
                           reobj.set("width",artWorkWidth+2*thickFrame);
                           reobj.set("height",artWorkHeight+2*thickFrame);
                           canvas.renderAll();

                       });
               });
             });
           });
        }

        else {
            fabric.Image.fromURL(urlTop, function(img1){

                var poly1 = new fabric.Polyline([
                    { x: thickFrame, y: thickFrame },
                    { x: thickFrame+artWorkWidth+2*innerthickFrame, y: thickFrame },
                    { x: thickFrame+artWorkWidth+thickFrame+2*innerthickFrame, y: 0},
                    { x: 0, y: 0 },
                    { x: thickFrame, y: thickFrame }
                ], {
                    left: -(artWorkWidth/2+innerthickFrame + thickFrame),
                    top: -(artWorkHeight/2 + thickFrame+innerthickFrame)
                });
     
                var pattern1 = new fabric.Pattern({source: img1.getElement(), offsetX: 0, offsetY: 0});
                poly1.set({       
                    id:frameUrl,     
                  fill: pattern1,
                });
    
               fabric.Image.fromURL(urlRight, function(img2){
     
                   var poly2 = new fabric.Polyline([
                       { x: 0, y: 0 },
                       { x: 0, y: artWorkHeight+2*innerthickFrame },
                       { x: thickFrame, y: artWorkHeight + thickFrame+2*innerthickFrame},
                       { x: thickFrame, y: - thickFrame },
                       { x: 0, y: 0 }
                   ], {
                   left: artWorkWidth/2+innerthickFrame,
                   top: -(artWorkHeight/2 + thickFrame+innerthickFrame)
                   });
           
                   var pattern2 = new fabric.Pattern({source: img2.getElement(), offsetX: 0, offsetY: 0});
                   poly2.set({       
                       id:"frames",     
                     fill: pattern2,
                   });
                                     
                   fabric.Image.fromURL(urlBottom, function(img3){
                     
                           var poly3 = new fabric.Polyline([
                               { x: 0, y: 0 },
                               { x: -thickFrame, y: thickFrame },
                               { x: artWorkWidth+thickFrame+2*innerthickFrame, y:  thickFrame},
                               { x: artWorkWidth+2*innerthickFrame, y: 0 },
                               { x: 0, y: 0 }
                           ], {
                           left: -(artWorkWidth/2 + thickFrame+innerthickFrame),
                           top: artWorkHeight/2+innerthickFrame,
                           });
    
                           var pattern3 = new fabric.Pattern({source: img3.getElement(), offsetX: 0, offsetY: 0});
                           poly3.set({       
                               id:"frames",     
                             fill: pattern3,
                           });
    
                             fabric.Image.fromURL(urlLeft, function(img4){
                               
                               var poly4 = new fabric.Polyline([
                                   { x: 0, y: 0 },
                                   { x: -thickFrame, y: -thickFrame },
                                   { x: -thickFrame, y: artWorkHeight + thickFrame+2*innerthickFrame},
                                   { x: 0, y: artWorkHeight+2*innerthickFrame },
                                   { x: 0, y: 0 }
                               ], {
                                left: -(artWorkWidth/2 + thickFrame+innerthickFrame),
                                top: -(artWorkHeight/2 + thickFrame+innerthickFrame)
                               });
                       
                               var pattern4 = new fabric.Pattern({source: img4.getElement(), offsetX: 0, offsetY: 0});
                               poly4.set({       
                                   id:"frames",     
                                 fill: pattern4,
                               });
    
                               reobj.add(poly1, poly2, poly3, poly4);
                               reobj.set("width",artWorkWidth+2*thickFrame+2*innerthickFrame);
                               reobj.set("height",artWorkHeight+2*thickFrame+2*innerthickFrame);
                               canvas.renderAll();
    
                           });
                   });
                 });
               });

        }
 }

  function addInnerFrame(inObj) {

  if(innerframeUrl == 6){
    var innerColor = new fabric.Rect({
        id: innerframeUrl,
        width: artWorkWidth + 2*innerthickFrame,
        height: artWorkHeight +2*innerthickFrame,
        left:-artWorkWidth/2-innerthickFrame,
        top:-artWorkHeight/2-innerthickFrame,
        fill:$("#ip6").val(),
        });
       inObj.insertAt(innerColor, 0);
       canvas.renderAll();
  }
    else{
        var inUrl = "../frames/" + innerframeUrl + "/icon.jpg";
    
    fabric.Image.fromURL(inUrl, function(img){
        img.id = innerframeUrl;
        img.left = -artWorkWidth/2-innerthickFrame;
        img.top = -artWorkHeight/2-innerthickFrame;
        img.scaleToHeight(artWorkHeight+2*innerthickFrame);
        img.set("scaleX", (artWorkWidth+2*innerthickFrame)/img.width);
        inObj.insertAt(img,0);
        canvas.renderAll();
    });
    }
  }

// $(".check").click(()=>{
//     var val1 =Number($("#OriginWidth").val());
//     var val2 =Number($("#OriginHeight").val());
//     if(val1 && val2){
//         $(".dismiss").click();
//         $("#wd").val(val1);
//         $("#hd").val(val2);
//     }
//     else {
//         $(".validation").show();
//     }
// });



 