const express=require('express');
var app=express();
const fs=require('fs');
app.use(express.json());
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

app.get('/boot',function(req,res){
    res.sendFile(__dirname+'/boot.html');
})


app.post('/form',function(req,res){
    var ids=req.body.id;
    var fnamee=req.body.fname;
    var addr =req.body.add;
    var English=Number(req.body.eng);
    var Hindi=Number(req.body.hindi);
    var Punjabi=Number(req.body.pun);
    var Maths=Number(req.body.maths);
    var Physics=Number(req.body.phy); 
    var Chemistry=Number(req.body.che);

    var total=Number(English+Hindi+Punjabi+Maths+Physics+Chemistry);
    var average=total/6;
    
    var grade = 'A';
    if(average>=90){
        grade='A';
    }else if(average>=80 && average<90){
        grade='B';
    }else if(average>=70 && average<80){
        grade='C';
    }else if(average>=55 && average<70){
        grade='D';
    }else if(average>=40 && average<55){
        grade='E';
    }else{
        grade='F';
    }

    

    let scoreCard = {
        'Student Id' : ids,
        'Student Name' : fnamee,
        'Address':addr,
        'English' : English,
        'Hindi' : Hindi,
        'Punjabi':Punjabi,
        'Maths' : Maths,
        'Physics':Physics,
        'Chemistry':Chemistry,
        'Total Marks' : total,
        'Average Marks' : average,
        'Grade':grade
    }

    
    
    fs.appendFileSync("abc.txt",JSON.stringify(scoreCard));
    const data = fs.readFileSync("abc.txt","utf-8")
   
    console.log(data);
    res.send(data);
})

app.listen(3000,()=>{
    console.log("Server started at 3000.")
})

    
