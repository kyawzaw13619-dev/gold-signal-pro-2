self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    self.registration.showNotification(event.data.title || "GOLD SIGNAL PRO", {
      body: event.data.message,
      icon: "./icon-192.png",
      badge: "./icon-192.png",
      vibrate: [200, 100, 200],
      tag: "gold-signal"
    });
  }
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if ("focus" in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow("./");
    })
  );
});
