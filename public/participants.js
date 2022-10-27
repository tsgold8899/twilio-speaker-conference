$(document).ready(function() {
  $('#delete-form').submit(function (e) {
    if (!confirm("Are you sure you want to delete?")){
      e.preventDefault();
    }
  });
  if (!twilioToken) return;
  if (!twilioRoom) return;

  const div = $('#participants-list');

  function trackSubscribed(track) {
    console.log('subscribed');
    console.log(track);
    div.append(track.attach());
  }

  function trackUnsubscribed(track) {
    console.log('unsubscribed');
    console.log(track);
    track.detach().forEach(element => element.remove());
  }

  function listenToSubscriptionEvents(publication) {
    if (publication.isSubscribed) {
      trackSubscribed(publication.track);
    } else {
      publication.on('subscribed', trackSubscribed);
      publication.on('unsubscribed', trackUnsubscribed);
    }
  }

  function participantConnected(participant) {
    console.log(`participant ${participant.sid}`);
    participant.tracks.forEach(listenToSubscriptionEvents);
  }

  function participantDisconnected(participant) {
    $(`#${participant.sid}`).remove();
  }

  const params = (new URL(document.location)).searchParams;

  Twilio.Video.connect(twilioToken, {
    name: twilioRoom,
    audio: role === 'speaker' && params.get('audio') !== 'off',
    video: role === 'speaker' && params.get('video') === 'on',
  }).then(room => {
    console.log(`Successfully joined a Room: ${room}`);
    room.on('trackPublished', listenToSubscriptionEvents);
    participantConnected(room.localParticipant);
    room.participants.forEach(participantConnected);
    room.on('participantConnected', participantConnected);
    room.on('participantDisconnected', participantDisconnected);
    room.on('disconnected', room => room.participants.forEach(participantDisconnected));
  }, error => {
    console.error(`Unable to connect to Room: ${error.message}`);
  });
});
