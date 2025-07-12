
// Թիմի անդամների ցուցադրման անիմացիա
document.addEventListener('DOMContentLoaded', function() {
  const teamCards = document.querySelectorAll('.team-card');
  
  teamCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease ' + (index * 0.1) + 's';
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100);
  });
  
  // Թիմլայնի անիմացիա
  const timelineItems = document.querySelectorAll('.timeline-content');
  
  window.addEventListener('scroll', function() {
    timelineItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (itemTop < windowHeight - 100) {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }
    });
  });
  
  // Սկզբնական վիճակ
  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transition = 'all 0.5s ease';
  });
  
  const leftItems = document.querySelectorAll('.left .timeline-content');
  leftItems.forEach(item => {
    item.style.transform = 'translateX(-50px)';
  });
  
  const rightItems = document.querySelectorAll('.right .timeline-content');
  rightItems.forEach(item => {
    item.style.transform = 'translateX(50px)';
  });
  
  // Թրիգեր անիմացիայի համար
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 500);
});

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.certificates-slider');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const certificates = document.querySelectorAll('.certificate');
    const certificateWidth = certificates[0].offsetWidth + 40; // + gap
  
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -certificateWidth, behavior: 'smooth' });
    });
  
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: certificateWidth, behavior: 'smooth' });
    });
  
    // Անջատել նավիգացիայի կոճակները երբ սլայդը սկզբում կամ վերջում է
    function handleScroll() {
      prevBtn.disabled = slider.scrollLeft === 0;
      nextBtn.disabled = slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 1;
    }
  
    slider.addEventListener('scroll', handleScroll);
    handleScroll(); // Սկզբնական ստատուսի ստուգում
  });