// Lida com o envio do formulário
function handleFormSubmission() {
    document.querySelector('.email-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.querySelector('.email-input').value;
        if (email) {
            alert(`Obrigado! Vamos enviar mais informações para ${email}`);
        }
    });
}

// Funcionalidade do carrossel
class NetflixCarousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        if (!this.track || !this.prevBtn || !this.nextBtn) return;
        
        this.originalCards = Array.from(document.querySelectorAll('.movie-card'));
        this.totalItems = this.originalCards.length;
        this.itemsPerView = this.getItemsPerView();
        this.currentIndex = 0;
        this.isTransitioning = false;
        
        this.init();
    }

    getItemsPerView() {
        const width = window.innerWidth;
        if (width >= 1400) return 6;
        if (width >= 1200) return 5;
        if (width >= 768) return 4;
        if (width >= 480) return 3;
        return 2;
    }

    init() {
        this.setupCircularTrack();
        this.prevBtn.addEventListener('click', () => this.slidePrev());
        this.nextBtn.addEventListener('click', () => this.slideNext());
        
        window.addEventListener('resize', () => {
            this.itemsPerView = this.getItemsPerView();
            this.setupCircularTrack();
            this.updateCarousel(false);
        });

        this.updateCarousel(false);
    }

    setupCircularTrack() {
        this.track.innerHTML = '';
        
        const clonesBefore = [];
        const clonesAfter = [];
        
        for (let i = 0; i < this.itemsPerView; i++) {
            const beforeIndex = this.totalItems - this.itemsPerView + i;
            const beforeClone = this.originalCards[beforeIndex].cloneNode(true);
            beforeClone.classList.add('clone');
            clonesBefore.push(beforeClone);
            
            const afterClone = this.originalCards[i].cloneNode(true);
            afterClone.classList.add('clone');
            clonesAfter.push(afterClone);
        }
        
        clonesBefore.forEach(clone => this.track.appendChild(clone));
        this.originalCards.forEach(card => this.track.appendChild(card));
        clonesAfter.forEach(clone => this.track.appendChild(clone));
        
        this.currentIndex = this.itemsPerView;
    }

    slidePrev() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentIndex--;
        this.updateCarousel(true);
        
        setTimeout(() => {
            if (this.currentIndex < this.itemsPerView) {
                this.currentIndex = this.totalItems;
                this.updateCarousel(false);
            }
            this.isTransitioning = false;
        }, 500);
    }

    slideNext() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentIndex++;
        this.updateCarousel(true);
        
        setTimeout(() => {
            if (this.currentIndex >= this.totalItems + this.itemsPerView) {
                this.currentIndex = this.itemsPerView;
                this.updateCarousel(false);
            }
            this.isTransitioning = false;
        }, 500);
    }

    updateCarousel(withTransition = true) {
        const itemWidth = 160; // Largura do cartão do filme
        const gap = 8; // Espaçamento entre os itens
        const translateX = -this.currentIndex * (itemWidth + gap);
        
        if (withTransition) {
            this.track.style.transition = 'transform 0.5s ease';
        } else {
            this.track.style.transition = 'none';
        }
        
        this.track.style.transform = `translateX(${translateX}px)`;
        
        if (!withTransition) {
            setTimeout(() => {
                this.track.style.transition = 'transform 0.5s ease';
            }, 50);
        }
    }
}

// Efeitos de hover nos cartões de filme
function addMovieCardEffects() {
    document.addEventListener('mouseenter', function(e) {
        if (e.target.closest('.movie-card')) {
            const card = e.target.closest('.movie-card');
            card.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
        }
    }, true);
    
    document.addEventListener('mouseleave', function(e) {
        if (e.target.closest('.movie-card')) {
            const card = e.target.closest('.movie-card');
            card.style.boxShadow = 'none';
        }
    }, true);
    
    document.addEventListener('click', function(e) {
        if (e.target.closest('.movie-card')) {
            const card = e.target.closest('.movie-card');
            const rank = card.getAttribute('data-rank');
            if (rank) {
                showMovieInfo(rank);
            }
        }
    });
}

// Mostra informações do filme (função placeholder)
function showMovieInfo(rank) {
    const movieTitles = {
        '1': 'Filme em Alta #1',
        '2': 'Filme em Alta #2',
        '3': 'Filme em Alta #3',
        '4': 'Filme em Alta #4',
        '5': 'Filme em Alta #5',
        '6': 'Filme em Alta #6',
        '7': 'Filme em Alta #7',
        '8': 'Filme em Alta #8',
        '9': 'Filme em Alta #9',
        '10': 'Filme em Alta #10'
    };
    
    alert(`Você clicou em: ${movieTitles[rank] || 'Filme Desconhecido'}`);
}

// Efeito de rolagem do cabeçalho
function addHeaderScrollEffect() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(20, 20, 20, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.7) 10%, transparent)';
            header.style.backdropFilter = 'none';
        }
    });
}

// Animação dos cartões de razão
function addReasonCardsAnimation() {
    const reasonCards = document.querySelectorAll('.reason-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reasonCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Inicializa a animação de carregamento dos pôsteres de filmes
function initializeMoviePosters() {
    const moviePosters = document.querySelectorAll('.movie-poster');
    moviePosters.forEach((poster, index) => {
        poster.style.opacity = '0';
        poster.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            poster.style.opacity = '1';
        }, index * 100);
        
        poster.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/160x240/333333/666666?text=Filme+' + (index + 1);
        });
    });
}

// Inicializa a página
function init() {
    handleFormSubmission();
    
    if (document.getElementById('carouselTrack')) {
        new NetflixCarousel();
        addMovieCardEffects();
        initializeMoviePosters();
    }
    
    addHeaderScrollEffect();
    
    if (document.querySelectorAll('.reason-card').length > 0) {
        addReasonCardsAnimation();
    }
}

// Lida com a navegação por teclado
document.addEventListener('keydown', function(e) {
    const track = document.getElementById('carouselTrack');
    if (!track) return;
    
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        document.getElementById('prevBtn')?.click();
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        document.getElementById('nextBtn')?.click();
    }
});

// Executa a inicialização quando o DOM é carregado
document.addEventListener('DOMContentLoaded', init);