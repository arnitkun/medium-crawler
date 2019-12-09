const url = require('url-parse');
const parseParams =  require('./parseParams')

const arr = { 'http://www.medium.com': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=landing_home---------------------------': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----9db0094a1e0f----------------------': true,
  'http://www.medium.com/?source=post_page-----9db0094a1e0f----------------------': true,
  'http://www.medium.com/jobs-at-medium/work-at-medium-959d1a85284e?source=landing_home---------------------------': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----959d1a85284e----------------------': true,
  'http://www.medium.com/policy?source=follow_footer--------------------------follow_footer-': true,
  'http://www.medium.com/@Medium?source=follow_footer--------------------------follow_footer-': true,
  'http://www.medium.com/@Medium?source=---------8------------------': true,
  'http://www.medium.com/@Medium?source=---------7------------------': true,
  'http://www.medium.com/@Medium?source=---------6------------------': true,
  'http://www.medium.com/@Medium?source=---------5------------------': true,
  'http://www.medium.com/policy/medium-rules-30e5502c4eb4?source=---------4------------------': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----30e5502c4eb4----------------------': true,
  'http://www.medium.com/tag/medium': true,
  'http://www.medium.com/tag/terms': true,
  'http://www.medium.com/tag/terms-and-conditions': true,
  'http://www.medium.com/policy?source=post_sidebar--------------------------post_sidebar-': true,
  'http://www.medium.com/@Medium/amendment-to-medium-terms-of-service-applicable-to-u-s-government-users-fccb00db67d7': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----fccb00db67d7----------------------': true,
  'http://www.medium.com/policy/mediums-trademark-policy-e3bb53df59a7': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----e3bb53df59a7----------------------': true,
  'http://www.medium.com/policy/mediums-copyright-and-dmca-policy-d126f73695': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----d126f73695----------------------': true,
  'http://www.medium.com/@Medium/medium-username-policy-7054a77fb04f': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----7054a77fb04f----------------------': true,
  'http://www.medium.com/policy/medium-rules-30e5502c4eb4': true,
  'http://www.medium.com/?source=post_page-----30e5502c4eb4----------------------': true,
  'http://www.medium.com/tag/rules': true,
  'http://www.medium.com/policy/medium-privacy-policy-f03bf92035c9': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----f03bf92035c9----------------------': true,
  'http://www.medium.com/p/f03bf92035c9': true,
  'http://www.medium.com/?source=post_page-----f03bf92035c9----------------------': true,
  'http://www.medium.com/tag/privacy': true,
  'http://www.medium.com/policy/paid-terms-of-service-cc7f8e165178': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----cc7f8e165178----------------------': true,
  'http://www.medium.com/policy/medium-s-bug-bounty-disclosure-program-34b1c80764c2': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----34b1c80764c2----------------------': true,
  'http://www.medium.com/policy/medium-terms-of-service-9db0094a1e0f?source=post_page-----9db0094a1e0f----------------------': true,
  'http://www.medium.com/@Medium?source=post_page-----9db0094a1e0f----------------------': true,
  'http://www.medium.com/policy?source=---------4------------------': true,
  'http://www.medium.com/@Medium?source=---------4------------------': true,
  'http://www.medium.com/@Medium?source=---------2------------------': true,
  'http://www.medium.com/@Medium/highlights': true,
  'http://www.medium.com/@_ob_yan/faux-fixes-and-performance-updates-cc9034828150?source=---------3------------------': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----cc9034828150----------------------': true,
  'http://www.medium.com/policy?source=post_page-----9db0094a1e0f----------------------': true,
  'http://www.medium.com/?source=post_page-----cc9034828150----------------------': true,
  'http://www.medium.com/@_ob_yan?source=follow_footer--------------------------follow_footer-': true,
  'http://www.medium.com/@_ob_yan?source=---------6------------------': true,
  'http://www.medium.com/@_ob_yan?source=---------5------------------': true,
  'http://www.medium.com/@_ob_yan?source=---------4------------------': true,
  'http://www.medium.com/@_ob_yan?source=---------3------------------': true,
  'http://www.medium.com/@_ob_yan?source=---------2------------------': true,
  'http://www.medium.com/@_ob_yan/responses': true,
  'http://www.medium.com/@_ob_yan/what-do-you-think-of-the-idea-that-roe-v-c861adf5c0eb?source=---------9------------------': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----c861adf5c0eb----------------------': true,
  'http://www.medium.com/?source=post_page-----c861adf5c0eb----------------------': true,
  'http://www.medium.com/@_ob_yan/what-do-you-think-of-the-idea-that-roe-v-c861adf5c0eb?source=post_page-----c861adf5c0eb----------------------': true,
  'http://www.medium.com/@_ob_yan?source=post_page-----c861adf5c0eb----------------------': true,
  'http://www.medium.com/@_ob_yan/highlights': true,
  'http://www.medium.com/the-hairpin/advice-for-single-men-dont-tweet-a-lot-or-maybe-ever-e27ad45c9fbe?source=---------5------------------': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----e27ad45c9fbe----------------------': true,
  'http://www.medium.com/?source=post_page-----e27ad45c9fbe----------------------': true,
  'http://www.medium.com/the-hairpin?source=follow_footer--------------------------follow_footer-': true,
  'http://www.medium.com/@kellyconaboy?source=follow_footer--------------------------follow_footer-': true,
  'http://www.medium.com/the-hairpin/we-used-to-follow-lucas-duda-5e5f2b25cfb0?source=---------7------------------': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----5e5f2b25cfb0----------------------': true,
  'http://www.medium.com/?source=post_page-----5e5f2b25cfb0----------------------': true,
  'http://www.medium.com/the-hairpin?source=post_sidebar--------------------------post_sidebar-': true,
  'http://www.medium.com/the-hairpin/we-used-to-follow-lucas-duda-5e5f2b25cfb0?source=post_page-----5e5f2b25cfb0----------------------': true,
  'http://www.medium.com/@kellyconaboy?source=post_page-----5e5f2b25cfb0----------------------': true,
  'http://www.medium.com/the-hairpin?source=---------7------------------': true,
  'http://www.medium.com/@kellyconaboy?source=---------7------------------': true,
  'http://www.medium.com/the-hairpin/maybe-do-something-nice-tonight-1f006cced3b0?source=---------6------------------': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----1f006cced3b0----------------------': true,
  'http://www.medium.com/?source=post_page-----1f006cced3b0----------------------': true,
  'http://www.medium.com/the-hairpin/maybe-do-something-nice-tonight-1f006cced3b0?source=post_page-----1f006cced3b0----------------------': true,
  'http://www.medium.com/@kellyconaboy?source=post_page-----1f006cced3b0----------------------': true,
  'http://www.medium.com/the-hairpin?source=---------6------------------': true,
  'http://www.medium.com/@kellyconaboy?source=---------6------------------': true,
  'http://www.medium.com/the-hairpin/have-you-done-a-moon-salutation-5c86ea837586?source=---------5------------------': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----5c86ea837586----------------------': true,
  'http://www.medium.com/?source=post_page-----5c86ea837586----------------------': true,
  'http://www.medium.com/the-hairpin/have-you-done-a-moon-salutation-5c86ea837586?source=post_page-----5c86ea837586----------------------': true,
  'http://www.medium.com/@kellyconaboy?source=post_page-----5c86ea837586----------------------': true,
  'http://www.medium.com/the-hairpin?source=---------5------------------': true,
  'http://www.medium.com/@kellyconaboy?source=---------5------------------': true,
  'http://www.medium.com/the-hairpin/dog-questions-to-which-the-answer-is-you-are-ranked-969aa274da55?source=---------4------------------': true,
  'http://www.medium.com/policy/9db0094a1e0f?source=post_page-----969aa274da55----------------------': true,
  'http://www.medium.com/the-hairpin/dog-questions-to-which-the-answer-is-you-are-ranked-969aa274da55?source=post_page-----969aa274da55----------------------': true }

 

let paths = Object.keys(arr);
// console.log(paths)
let linksAndRefs = {};
let linksAndParams = {};
paths.forEach(elem => {
    link = new URL(elem);
    linkPath = link.hostname + link.pathname;
    if(link != linkPath){
    console.log(parseParams.getAllUrlParams(link))
    }
    linkPath = link.hostname + link.pathname;
    linksAndRefs[linkPath] = linksAndRefs[linkPath]+1 || 1;
})

// console.log((linksAndRefs))
