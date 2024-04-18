const App = {
  $: {
    notifications: document.querySelectorAll('.notif'),
    unreadMarkers: document.querySelectorAll('.unread-marker'),
    notifCount: document.getElementById('notif-count'),
    markAllAsRead: document.getElementById('mark-all-as-read'),
    notificationContent: document.querySelectorAll('.notif-content'),
  },

  state: {
    unreadMarkers: [],
  },

  init() {
    App.eventHandlers();
  },

  setAllNotificationsToRead() {
    App.$.notifications.forEach((notification) => {
      notification.classList.remove('light-grayish-blue-1');
      notification.classList.add('white');
    });

    App.$.unreadMarkers.forEach((unreadMarker) => {
      unreadMarker.classList.add('hidden');
    });
  },

  eventHandlers() {
    // Getting the notification count
    const notificationCount = App.$.notifCount;
    App.$.unreadMarkers.forEach((unreadMarker) => {
      App.state.unreadMarkers.push(unreadMarker);
    });
    notificationCount.innerText = App.state.unreadMarkers.length;

    // Changing the BG color and removing the unread marker for each notification when clicked
    App.$.notifications.forEach((notif, index) => {
      notif.addEventListener('click', () => {
        notif.classList.remove('light-grayish-blue-1');
        notif.classList.add('white');

        let notifIndex = index;

        // Removing unread marker
        App.$.unreadMarkers.forEach((unreadMarker, index) => {
          let markerIndex = index;
          markerIndex === notifIndex
            ? (unreadMarker.classList.add('hidden'),
              App.state.unreadMarkers.pop(),
              (notificationCount.innerText = App.state.unreadMarkers.length))
            : null;
        });
        App.$.notificationContent.forEach((notifContent) => {
          if (notif.id === 'notif-4') {
            if (notifContent.id === 'notif-content-1') {
              notifContent.classList.toggle('hidden');
            }
          } else if (notif.id === 'notif-5') {
            if (notifContent.id === 'notif-content-2') {
              notifContent.classList.toggle('hidden');
            }
          }
        });
      });
    });

    App.$.markAllAsRead.addEventListener('click', () => {
      // Setting the notification count to zero
      App.state.unreadMarkers = [];
      notificationCount.innerText = App.state.unreadMarkers.length;

      App.state.unreadMarkers.length === 0
        ? App.setAllNotificationsToRead()
        : null;
    });
  },
};

window.addEventListener('load', App.init);
