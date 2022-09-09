const Joi = require('joi');
const express = require ('express');
const bodyparser = require('body-parser');
const app = express();

app.use(express.json());

app.use(bodyparser.urlencoded({extended: true}));

const courses = [
	{id:1 , name:"course1"},
	{id:2 , name:"course2"},
	{id:3 , name:"course3"},
]

app.get('', (req, res)=>{
	res.sendFile(__dirname+'/index.html');
	//res.send('Calculator made with Node.js!! - Perform Calculations using syntax: /operator/number1/number2');
});


app.get('/api/courses',(req,res)=>{
	

	//console.log(courses)
	res.send(courses);	
});

app.post('/api/courses', (req,res)=> {


        const { error} = validateCourse(req.body);

         if(error){
                // 400 Bad Request
                res.status(400).send(error.details[0].message);
                return;
        }

	const course = {
		id: courses.length+1,
		name: req.body.name
	};
	console.log(course.id)
	courses.push(course);
	res.send(course);
	
});


app.put('/api/courses/:id', (req,res)=> {
	const course = courses.find(c => c.id === parseInt(req.params.id));
       if(!course) return res.status(404).send('NotFound');

        const { error} = validateCourse(req.body);

	 if(error){
                // 400 Bad Request
                res.status(400).send(error.details[0].message);
                return;
        }

	course.name = req.body.name;
	res.send(course);
});


function validateCourse(course){
	const schema = Joi.object({
                name: Joi.string().min(3).required()
        });

        return schema.validate(course);

}

app.delete('/api/courses/:id',(req,res)=>{
	const course = courses.find(c => c.id === parseInt(req.params.id));
       if(!course) return res.status(404).send('NotFound');

	const index = courses.indexOf(course);

	courses.splice(index,1);

	res.send(course);
});

app.get('/api/courses/:id',(req,res)=>{
       const course = courses.find(c => c.id === parseInt(req.params.id));
       if(!course) res.status(404).send('NotFound');
	res.send(course);
});

app.post('/', (req,res)=>{
	const n1 = parseInt(req.body.num1);
	const n2 = parseInt(req.body.num2);
	
	const op = req.body.operator;

	let result;
	console.log(n1, n2, op);

	const errorMessage = "<h1>404</h1><p>Sorry it seems there was an error in the input you gave, please try again.</p>";

        function calculate(n1, n2, op){

                if(op === 'add'){
                   result = n1 + n2;
                   res.send(`Value is: ${result}`);
                } else if( op === "subtract"){
                   result = n1 - n2;
                   res.send(`Value is: ${result}`);
                } else if( op === 'divide'){
                   result = n1 / n2;
                   res.send(`Value is: ${result}`);
                } else if( op === 'multiply'){
                   result = n1 * n2;
                   res.send(`Value is: ${result}`);
                } else {
                   res.send(errorMessage);
                }
                console.log(result);
        }
        calculate(n1,n2, op);
});

app.get('/api/:op/:num1/:num2', (req,res) => {
	let operator = req.params.op;
	let num1 = parseInt(req.params.num1);
	let num2 = parseInt(req.params.num2);
	let result;
	console.log(num1,num2)
	
	/*switch(operator){
	 
	 case 'add':
		result = num1 + num2;
		break;
	
	 case 'subtract':
		result = num1 - num2;
		break;

	 case 'divide':
		result = num1 / num2;
		break;

	 case 'multiply':
		result = num1 * num2;
		break;

	 default: 
		result = "Invalid entry, pls enter: operator/number1/number2";
	}*/


	
	const errorMessage = "<h1>404</h1><p>Sorry it seems there was an error in the input you gave, please try again.</p>";

	function calculate(num1, num2, op){
		
		if(op === 'add'){
		   result = num1 + num2;
		   res.send(`Value is: ${result}`);
		} else if( op === "subtract"){
		   result = num1 - num2;
		   res.send(`Value is: ${result}`);
		} else if( op === 'divide'){
		   result = num1 / num2;
		   res.send(`Value is: ${result}`);
		} else if( op === 'multiply'){
		   result = num1 * num2;
		   res.send(`Value is: ${result}`);
		} else {
		   res.send(errorMessage);
		}
		console.log(result);
	}	
	calculate(num1,num2, operator)	
});


// PORT
const port = process.env.PORT || 4200;
app.listen(port, ()=> console.log(`listening on port ${port}... `))




