
fetch('/api/hero')
 .then(res => res.json())
 .then(data => {
   if(data){
   document.querySelector('.content-hero-title').innerText = data.title;
   document.querySelector('.hero-subtitle-one').innerText = data.subtitle_one;
   document.querySelector('.hero-subtitle-two').innerText = data.subtitle_two;
   }
 });

 fetch('/api/connect')
 .then(res => res.json())
 .then(data => {
   if(data){
   document.querySelector('.connect-email').innerText = data.email;
   document.querySelector('.connect-phone').innerText = data.phone;
   document.querySelector('.connect-address').innerText = data.address;
   document.querySelector('.connect-website').innerHTML = data.website;
   }
 });

 async function toggleEdit(button, isEditing) {
    // 1. Find the parent "editable-content" div for the button clicked
    const container = button.closest('.editable-content');

    // 2. Swap the buttons
    container.querySelector('.edit-btn').style.display = isEditing ? 'none' : 'inline-block';
    container.querySelector('.update-btn').style.display = isEditing ? 'inline-block' : 'none';

    const editBtn = container.querySelector('.edit-btn');
    const updateBtn = container.querySelector('.update-btn');
    const editableElements = container.querySelectorAll('.editable-target');

    if(isEditing){
        editableElements.forEach(el => {
            el.setAttribute('contenteditable', 'true');
            el.style.border = "1px dashed #00ffcc";
            el.style.padding = "5px";
        });
        editBtn.style.display = 'none';
        updateBtn.style.display = 'inline-block';
    }else{
        editableElements.forEach(el => {
            el.setAttribute('contenteditable', 'false');
            el.style.border = "none";
        });
        editBtn.style.display = 'inline-block';
        updateBtn.style.display = 'none';

        await saveContent(container);
    }
}

async function saveContent(container){
    try{
        if(container.id === 'about-container'){
            const title = container.querySelector('.content-hero-title')?.innerText.trim();
            const subtitle_one = container.querySelector('.hero-subtitle-one')?.innerText.trim();
            const subtitle_two = container.querySelector('.hero-subtitle-two')?.innerText.trim();

            const res = await fetch('/api/hero', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title,
                    subtitle_one,
                    subtitle_two
                })
            });

            if(!res.ok){
                throw new Error("Failed to Save");
            }

            alert("Hero Section Saved Successfully");
        } else if(container.id === 'contact-container'){
            const email = container.querySelector('.connect-email')?.innerText.trim();
            const phone = container.querySelector('.connect-phone')?.innerText.trim();
            const address = container.querySelector('.connect-address')?.innerText.trim();
            const website = container.querySelector('.connect-website')?.innerText.trim();

            const res = await fetch('/api/connect', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email,
                    phone,
                    address,
                    website
                })
            });
            if(!res.ok){
                throw new Error("Failed to Save");
            }
            alert("Connect Section Saved Successfully");
        }
    }catch(err){
        console.error(err);
        alert("Error Saving Content");
    }
}
