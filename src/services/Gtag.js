export const fire = ({ action, category, label, value }) => {
    if (typeof window.gtag === 'function') {
        window.gtag('event', action, {
            'event_category': category,
            'event_label': label,
            'value': value
        })
    } else if (window.dataLayer) {
        const event = 'event';
        const eventAction = action;
        const eventCategory = category;
        const eventLabel = label;
        const eventValue = value;
        window.dataLayer.push({ event, eventCategory, eventAction, eventLabel, eventValue });
    }
};

export default { fire };
