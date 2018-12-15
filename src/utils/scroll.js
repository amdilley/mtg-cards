export const onScrollLastCardIntoView = (callback, buffer = 100) => {
    const remove = () => {
        try {
            const lastCard = document.querySelector('.mtg-card:last-child');
            const { top, bottom } = lastCard.getBoundingClientRect();

            if (top >= 0 && bottom - buffer <= window.innerHeight) {
                callback();
            }
        } catch (e) {
            console.log('initial load not ready');
        }
    };

    window.addEventListener('scroll', remove);

    return () => window.removeEventListener('scroll', remove);
};
