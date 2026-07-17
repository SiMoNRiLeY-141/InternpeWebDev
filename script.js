document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.task-card');

    let currentFilter = 'all';
    let searchQuery = '';

    // Filter and search logic
    const updateVisibility = () => {
        projectCards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            const category = card.getAttribute('data-category');
            
            // Collect tags
            const tags = Array.from(card.querySelectorAll('.tech-tag'))
                .map(t => t.textContent.toLowerCase());
            
            const matchesSearch = title.includes(searchQuery) || 
                                  desc.includes(searchQuery) || 
                                  tags.some(tag => tag.includes(searchQuery));
            
            const matchesFilter = currentFilter === 'all' || category === currentFilter;

            if (matchesSearch && matchesFilter) {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.4s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // Listeners
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            updateVisibility();
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            updateVisibility();
        });
    });
});
