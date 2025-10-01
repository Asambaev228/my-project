document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Закрытие мобильного меню при клике на ссылку
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.querySelector('nav ul');
            if (navMenu) navMenu.classList.remove('show');
        });
    });
    
    // Анимация сердца в логотипе
    const logo = document.querySelector('.logo');
    const heart = document.getElementById('heart');
    
    if (logo && heart) {
        logo.addEventListener('mouseenter', function() {
            heart.style.animation = 'heartbeat 1.5s ease-in-out infinite';
        });
        
        logo.addEventListener('mouseleave', function() {
            heart.style.animation = 'none';
            // Небольшая задержка для сброса анимации
            setTimeout(() => {
                heart.style.animation = '';
            }, 10);
        });
    }
    
    // Данные мероприятий
    const eventsData = [
        {
            id: 1,
            title: "Уборка городского парка",
            date: new Date(2025, 4, 15),
            type: "ecology",
            description: "Приглашаем всех желающих помочь в уборке городского парка. Приносите свои перчатки и хорошее настроение!",
            image: "event1.jpg",
            likes: 24,
            location: "Городской парк, центральный вход",
            liked: false
        },
        {
            id: 2,
            title: "Праздник для детей-сирот",
            date: new Date(2025, 5, 1),
            type: "children",
            description: "Организуем праздник для детей из детского дома. Нужны волонтеры для проведения игр и мастер-классов.",
            image: "event2.jpg",
            likes: 18,
            location: "Детский дом №3, ул. Детская, 15",
            liked: false
        },
        {
            id: 3,
            title: "Сбор вещей для нуждающихся",
            date: new Date(2025, 11, 10),
            type: "fundraising",
            description: "Собираем теплые вещи, продукты и предметы первой необходимости для малоимущих семей.",
            image: "event3.jpg",
            likes: 32,
            location: "Центр волонтеров, ул. Добрая, 10",
            liked: false
        },
        {
            id: 4,
            title: "Обучение компьютерной грамотности",
            date: new Date(2025, 6, 5),
            type: "education",
            description: "Помогаем пожилым людям освоить базовые навыки работы с компьютером и интернетом.",
            image: "event4.jpg",
            likes: 15,
            location: "Библиотека им. Ленина, читальный зал",
            liked: false
        },
        {
            id: 5,
            title: "Помощь в доме престарелых",
            date: new Date(2025, 6, 20),
            type: "elderly",
            description: "Приглашаем волонтеров для общения с пожилыми людьми и помощи по хозяйству.",
            image: "event5.jpg",
            likes: 22,
            location: "Дом престарелых, ул. Заботливая, 5",
            liked: false
        },
        {
            id: 6,
            title: "Посадка деревьев",
            date: new Date(2025, 3, 22),
            type: "ecology",
            description: "Акция по посадке деревьев в новом микрорайоне. Все материалы предоставляются.",
            image: "event6.jpg",
            likes: 28,
            location: "Микрорайон Солнечный, сквер",
            liked: false
        }
    ];
    
    // Загрузка состояния лайков из localStorage
    function loadLikes() {
        const likesData = JSON.parse(localStorage.getItem('volunteerLikes')) || {};
        eventsData.forEach(event => {
            if (likesData[event.id]) {
                event.liked = true;
                // Не увеличиваем likes, чтобы сохранить оригинальное значение + лайки пользователя
            }
        });
    }
    
    // Сохранение лайков в localStorage
    function saveLikes() {
        const likesData = {};
        eventsData.forEach(event => {
            if (event.liked) {
                likesData[event.id] = true;
            }
        });
        localStorage.setItem('volunteerLikes', JSON.stringify(likesData));
    }
    
    // Переключение лайка
    function toggleLike(eventId, button) {
        const event = eventsData.find(e => e.id === eventId);
        if (!event) return;
        
        const icon = button.querySelector('i');
        const countSpan = button.querySelector('.like-count');
        
        if (event.liked) {
            event.likes--;
            event.liked = false;
            icon.classList.replace('fas', 'far');
        } else {
            event.likes++;
            event.liked = true;
            icon.classList.replace('far', 'fas');
        }
        
        countSpan.textContent = event.likes;
        saveLikes();
    }
    
    // Форматирование даты
    function formatDate(date) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
    }
    
    // Получение названия типа мероприятия
    function getTypeName(type) {
        const types = {
            ecology: 'Экология',
            children: 'Дети',
            elderly: 'Пожилые',
            education: 'Образование',
            fundraising: 'Сбор средств'
        };
        return types[type] || type;
    }
    
    // Получение класса для типа мероприятия
    function getTypeClass(type) {
        return type;
    }
    
    // Открытие модального окна поддержки
    function openSupportModal(project) {
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const modal = document.getElementById('modal');
        
        const projectNames = {
            general: 'Общий фонд',
            clothes: 'Вещевая помощь',
            volunteer: 'Волонтерство'
        };
        
        modalTitle.textContent = `Поддержать проект: ${projectNames[project] || project}`;
        
        modalBody.innerHTML = `
            <p>Спасибо за ваше желание помочь нашему проекту "${projectNames[project] || project}"!</p>
            <p>Пожалуйста, выберите способ поддержки:</p>
            <div class="payment-options">
                <button class="payment-btn">Банковская карта</button>
                <button class="payment-btn">Электронный кошелек</button>
                <button class="payment-btn">СБП</button>
            </div>
            ${project === 'volunteer' ? '<p>Или оставьте свои контакты, и мы свяжемся с вами:</p><input type="text" placeholder="Ваше имя"><input type="tel" placeholder="Ваш телефон">' : ''}
        `;
        
        modal.style.display = 'flex';
        
        // Добавляем обработчики для кнопок оплаты
        const paymentBtns = modalBody.querySelectorAll('.payment-btn');
        paymentBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                alert(`Спасибо! Вы выбрали способ оплаты: ${this.textContent}. Перенаправляем на страницу оплаты...`);
                modal.style.display = 'none';
            });
        });
    }
    
    // Рендер календаря мероприятий
    function renderCalendar(events) {
        const calendarEl = document.getElementById('calendar');
        if (!calendarEl) return;
        
        calendarEl.innerHTML = '';
        
        if (events.length === 0) {
            calendarEl.innerHTML = '<p>Нет мероприятий, соответствующих выбранным фильтрам.</p>';
            return;
        }
        
        // Сортируем мероприятия по дате
        events.sort((a, b) => a.date - b.date);
        
        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            
            const typeClass = getTypeClass(event.type);
            
            eventCard.innerHTML = `
                <div class="event-image">
                    <img src="${event.image}" alt="${event.title}">
                </div>
                <div class="event-info">
                    <div class="event-date">
                        ${formatDate(event.date)}
                        <span class="event-type ${typeClass}">${getTypeName(event.type)}</span>
                    </div>
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    <div class="event-actions">
                        <button class="like-btn" data-id="${event.id}">
                            <i class="${event.liked ? 'fas' : 'far'} fa-heart"></i> 
                            <span class="like-count">${event.likes}</span>
                        </button>
                        <button class="btn">Участвовать</button>
                    </div>
                </div>
            `;
            
            calendarEl.appendChild(eventCard);
            
            // Добавляем обработчик для кнопки лайка
            const likeBtn = eventCard.querySelector('.like-btn');
            likeBtn.addEventListener('click', function() {
                const eventId = parseInt(this.getAttribute('data-id'));
                toggleLike(eventId, this);
            });
        });
    }
    
    // Фильтрация мероприятий
    function filterEvents() {
        const month = document.getElementById('month-filter').value;
        const type = document.getElementById('type-filter').value;
        
        let filteredEvents = [...eventsData];
        
        if (month !== 'all') {
            const monthNum = parseInt(month);
            filteredEvents = filteredEvents.filter(event => event.date.getMonth() === monthNum);
        }
        
        if (type !== 'all') {
            filteredEvents = filteredEvents.filter(event => event.type === type);
        }
        
        renderCalendar(filteredEvents);
    }
    
    // Инициализация календаря
    loadLikes();
    renderCalendar(eventsData);
    
    // Фильтрация мероприятий
    const monthFilter = document.getElementById('month-filter');
    const typeFilter = document.getElementById('type-filter');
    
    if (monthFilter && typeFilter) {
        monthFilter.addEventListener('change', filterEvents);
        typeFilter.addEventListener('change', filterEvents);
    }
    
    // Обработчики для кнопок лайков в галерее
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventId = parseInt(this.getAttribute('data-id'));
            toggleLike(eventId, this);
        });
    });
    
    // Обработчики для кнопок поддержки
    const supportButtons = document.querySelectorAll('.support-btn');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (supportButtons.length && modal && closeModal) {
        supportButtons.forEach(button => {
            button.addEventListener('click', function() {
                const project = this.getAttribute('data-project');
                openSupportModal(project);
            });
        });
        
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Обработка форм
    const feedbackForm = document.getElementById('feedback-form');
    const subscribeForm = document.getElementById('subscribe-form');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Спасибо за подписку, ${email}! Вы будете получать наши новости.`);
            this.reset();
        });
    }
});