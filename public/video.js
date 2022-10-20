$(document).ready(function() {
  $('#delete-form').submit(function (e) {
    if (!confirm("Are you sure you want to delete?")){
      e.preventDefault();
    }
  });
  if (!twilioToken) return;
  if (!twilioRoom) return;
  const Video = Twilio.Video;

  function trackSubscribed(div, track) {
    div.append(track.attach());
  }

  function trackUnsubscribed(track) {
    track.detach().forEach(element => element.remove());
  }

  function participantConnected(participant) {
    const self = this;
    const $div = $('<div></div>');
    $div.id = participant.sid;
    participant.on('trackSubscribed', track => trackSubscribed($div, track));
    participant.on('trackUnsubscribed', track => trackUnsubscribed(track));
    participant.tracks.forEach(publication => {
      if (publication.track) {
        trackSubscribed($div, publication.track);
      }
    });
    $('#video-list').append($div);
  }

  function participantDisconnected(participant) {
    $(`#${participant.sid}`).remove();
  }

  const params = (new URL(document.location)).searchParams;

  Video.connect(twilioToken, {
    name: twilioRoom,
    audio: role === 'speaker',
    // audio: false,
    video: role === 'speaker' && params.get('video') === 'on',
  }).then(room => {
    console.log(`Successfully joined a Room: ${room}`);
    room.on('participantConnected', participant => {
      console.log(`A remote Participant connected: ${participant}`);
    });

    participantConnected(room.localParticipant);
    room.participants.forEach(participant => participantConnected(participant));
    room.on('participantConnected', participant => participantConnected(participant));
    room.on('participantDisconnected', participant => participantDisconnected(participant));
    room.on('disconnected', room => room.participants.forEach(participant => {
      participantDisconnected(participant);
    }));
  }, error => {
    console.error(`Unable to connect to Room: ${error.message}`);
  });
});
