
    async function windowActions() {
        const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';



        const request = await fetch(endpoint)
         

        const types = await request.json()

        function findMatches(wordToMatch, types) {
            return types.filter(choice => {
                const regex = new RegExp(wordToMatch, 'gi');
                return choice.category.match(regex) || choice.name.match(regex)
            });
        }

        function displayMatches(event) {
            const matchArray = findMatches(event.target.value, types);
            const html = matchArray.map(choice => {
                const regex = new RegExp(event.target.value, 'gi');

                return `
               <li>
                <span class="decision">${choice.category}, ${choice.name}</span> <br>
                <span class="address">${choice.address_line_1}, <br>
                ${choice.city}, ${choice.state}, ${choice.zip}</span>
                </li>
                `
            }).join('');
            suggestions.innerHTML = html;
        }

        const searchInput = document.querySelector('.search');
        const suggestions = document.querySelector('.suggestions');

        searchInput.addEventListener('change', displayMatches);
        searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });
    }

    window.onload = windowActions;

