import * as $ from 'jquery';
import './css/unit.css';
import './assets/resist_bg.png';
import './assets/resist_down.png';
import './assets/resist_up.png';

const NULL = 'なし';

$(() => {
  const $shot = $('.shot');
  $shot.accordion({
    collapsible: true,
    active: false
  });

  $shot.each(function() {
    const $this = $(this);
    if (
      $this
        .find('h3')
        .text()
        .trim() === NULL
    ) {
      $this.accordion('disable');
    }
  });
});
