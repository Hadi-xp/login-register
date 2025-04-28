fetch('http://localhost:5000/register/getAllUser')
.then(res => res.json())
.then(data => console.log(data));