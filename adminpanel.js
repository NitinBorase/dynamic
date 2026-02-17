
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

// feature cards dynamic display
async function loadFeatures() {
   try{
      const res = await fetch('/api/features');
      if(!res.ok){
         throw new Error("Failed to Load Features");
      }
        const featuresFromDB = await res.json();      

      const carousel = document.getElementById('carousel');

      carousel.innerHTML = '';

      featuresFromDB.forEach((feature) => {
         const card = document.createElement('div');
         card.classList.add('feature-card-3d');
         card.innerHTML =`
            <div class="feature-card-content-3d">
            <button class="delete-feature-btn" data-id="${feature._id}" type="button">🚫</button>
            <div class="feature-icon-3d">${feature.featureSign}</div>
            <h3 class="feature-title-3d">${feature.featureName}</h3>
            <p class="feature-description-3d">${feature.featureDescription}</p>
            </div>
         `
         carousel.appendChild(card);
      })
      initCarousel();
   }catch(err){
        console.error("Error loading features:", err);
   }
}

document.addEventListener("DOMContentLoaded", loadFeatures);

const modal = document.getElementById('featureModal');
const addBtn = document.querySelector('.add-btn');
const closeBtn = document.querySelector('.close-btn');

addBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.dispaly = 'none';
});

window.addEventListener('click', (e) => {
    if(e.target === modal){
        modal.style.display = 'none';
    }
});

document.getElementById('featureForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const featureSign = document.getElementById('featureSign').value;
    const featureName = document.getElementById('featureName').value;
    const featureDescription = document.getElementById('featureDescription').value;

    try{
        const res = await fetch('/api/features', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                featureSign,
                featureName,
                featureDescription
            })
        });
        if(!res.ok){
            throw new Error("Failed to Add Feature");
        }
        alert("Feature Added Successfully");
        modal.style.display = 'none';
        loadFeatures();
    }
    catch(err){
        console.error(err);
        alert("Error Adding Feature");
    }
});

document.addEventListener('click', async (e) => {
    if(e.target.classList.contains('delete-feature-btn')){
        const id = e.target.getAttribute('data-id');

        alert("Are you sure you want to delete this feature?");
        if(!confirm("This action cannot be undone. Do you want to proceed?")){
            return;
        }

        try{
            const res = await fetch(`/api/features/${id}`, {
                method: 'DELETE'
            });

            alert("Feature Deleted Successfully");
            loadFeatures();
        }
        catch(err){
            console.error(err);
            alert("Error Deleting Feature");
        }
    }
});