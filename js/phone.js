const loadPhone = async (searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) =>{
    console.log(phones)

    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    console.log('is show all', isShowAll)
    // display only first 12 phones if not show All
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone =>{
        // console.log(phone);
        // 2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        // 3: set inner html
        phoneCard.innerHTML = `
    <div class="card bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
        <figure class="relative">
            <img src="${phone.image}" alt="${phone.phone_name}" class="w-full h-64 object-contain bg-gray-100" />
            <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            <figcaption class="absolute bottom-0 text-white text-lg font-semibold p-4">${phone.brand}</figcaption>
        </figure>
        <div class="card-body p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">${phone.phone_name}</h2>
            <p class="text-gray-600 font-semibold mb-4">Slug: ${phone.slug}</p>
            <div class="card-actions flex justify-end">
                <button class="btn btn-primary px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors duration-200">
                    Buy Now
                </button>
            </div>
        </div>
    </div>
`;


        // 4 append child
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
}


// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}


const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all
const handleShowAll = () =>{
    handleSearch(true);
}

// loadPhone();