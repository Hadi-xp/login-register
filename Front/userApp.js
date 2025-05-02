
fetch('http://localhost:5000/register/getUser',{
    method:'POST',
    headers: {
        'Content-Type': 'application/json', // Tell the server we are sending JSON
      },
      body:JSON.stringify({Email:'hadi.b.2002@gmail.com',Password:'hadixp81'})
})
.then(res => res.json())
.then(data => console.log(data))
