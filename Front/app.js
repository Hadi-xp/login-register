const form = document.querySelector('.login-form');
form.addEventListener('submit',async(e)=>{
    e.preventDefault();

    const formData = new FormData(form);
    const Email = formData.get('Email');
    const Password = formData.get('Password');

    const res = await fetch('http://localhost:5000/register/getUser',{
        method:'POST',
        body:JSON.stringify({Email,Password})
    })
    if(res.ok){
        const {token} = await res.json();
        localStorage.setItem('token',token);
        window.location.href = 'userPanel.html';
    }else{
        alert('login failed');
    }

   

})