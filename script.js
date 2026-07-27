/* ===========================
   COURSE SEARCH
=========================== */

document.addEventListener('DOMContentLoaded', createSearch);

/** Sets up the accessible, real-time course search. */
function createSearch() {
    const search = {
        container: document.querySelector('.course-search'),
        input: document.querySelector('#course-search-input'),
        toggle: document.querySelector('.search-toggle'),
        status: document.querySelector('#search-status'),
        cards: Array.from(document.querySelectorAll('.course-container .card')),
        noResultTimer: null
    };

    if (!search.container || !search.input || !search.toggle || !search.status) return;

    search.cards.forEach((card) => {
        card.dataset.searchTerms = getSearchTerms(card);
    });

    search.input.addEventListener('input', () => searchCourses(search));
    search.input.addEventListener('keydown', (event) => handleSearchKeys(event, search));
    search.toggle.addEventListener('click', () => toggleMobileSearch(search));
}

/** Creates searchable text from a card plus useful course-name aliases. */
function getSearchTerms(card) {
    const title = card.querySelector('h3')?.textContent.trim().toLowerCase() || '';
    const aliases = {
        dsa: 'data structures algorithms',
        javascript: 'java script',
        'c++': 'c plus plus'
    };

    return `${card.textContent} ${aliases[title] || ''}`.toLowerCase();
}

/** Finds cards that contain the supplied partial, case-insensitive query. */
function searchCourses(search) {
    const query = search.input.value.trim().toLowerCase();

    clearHighlights(search.cards);
    clearTimeout(search.noResultTimer);

    if (!query) {
        search.status.textContent = '';
        return [];
    }

    const results = search.cards.filter((card) => card.dataset.searchTerms.includes(query));
    highlightResults(results);

    if (results.length) {
        search.status.textContent = `${results.length} course${results.length === 1 ? '' : 's'} found.`;
        scrollToResult(results[0]);
    } else {
        showNoResults(search);
    }

    return results;
}

/** Applies the visual match state to each matching card. */
function highlightResults(results) {
    results.forEach((card) => card.classList.add('search-match'));
}

/** Removes visual match states from every course card. */
function clearHighlights(cards) {
    cards.forEach((card) => card.classList.remove('search-match'));
}

/** Scrolls smoothly to the first matching course card. */
function scrollToResult(result) {
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/** Announces a missing course briefly, then clears the message. */
function showNoResults(search) {
    search.status.textContent = 'No course found.';
    search.status.classList.add('is-visible');

    search.noResultTimer = setTimeout(() => {
        search.status.textContent = '';
        search.status.classList.remove('is-visible');
    }, 2000);
}

/** Handles Enter to jump and Escape to reset the search. */
function handleSearchKeys(event, search) {
    if (event.key === 'Enter') {
        const results = searchCourses(search);
        if (results.length) event.preventDefault();
    }

    if (event.key === 'Escape') {
        search.input.value = '';
        clearHighlights(search.cards);
        search.status.textContent = '';
        search.status.classList.remove('is-visible');
        search.input.blur();
    }
}

/** Expands or collapses the search control on mobile screens. */
function toggleMobileSearch(search) {
    const isOpen = search.container.classList.toggle('is-expanded');
    search.toggle.setAttribute('aria-expanded', String(isOpen));
    search.toggle.setAttribute('aria-label', isOpen ? 'Close course search' : 'Open course search');

    if (isOpen) search.input.focus();
}

const words = [

    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "Java",
    "C++",
    "DSA"

];

let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type(){

    currentWord = words[i];

    if(!isDeleting){

        document.getElementById("typing").textContent =
        currentWord.substring(0,j++);

        if(j > currentWord.length){

            isDeleting = true;

            setTimeout(type,1200);

            return;

        }

    }

    else{

        document.getElementById("typing").textContent =
        currentWord.substring(0,j--);

        if(j == 0){

            isDeleting = false;

            i++;

            if(i == words.length){

                i = 0;

            }

        }

    }

    setTimeout(type,isDeleting ? 70 : 120);

}

type();
