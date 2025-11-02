const modal = document.getElementById('modal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.querySelector('.close-btn');

// Открытие
openBtn.onclick = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Закрытие
const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

closeBtn.onclick = closeModal;

// Закрытие по клику на фон
modal.onclick = (e) => {
    if (e.target === modal) {
        closeModal();
    }
};

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});