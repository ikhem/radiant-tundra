import axios from 'axios';

let id = `client_id`
let sec = `secret_id`
let params = `?client_id=${id}&client_secret=${sec}`;

function getProfile(username) {
  return axios.get(`https://api.github.com/users/${username}${params}`)
              .then((user)=>{
                return user.data;
              })
              .catch((err)=>{
                console.log(err);
              });
}

function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
}

function getStarCount(repos){
  return repos.data.reduce((count,repo)=>{
    return count + repo.stargazers_count;
  }, 0)
}

function calculateScore(profile, repos){
  let folloers = profile.followers;
  let totalStars = getStarCount(repos);

  return(follwers * 3) + totalStars;
} 

function handleError(error){
  console.warn(error);
  return null;
}

function getUserData(player){
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then((data)=>{
    let profile = data[0];
    let repos = data[1];

    return{
      profile: profile,
      score: calculateScore(profile, repos)
    }
  });
}

function sortPlayers(players){
  return players.sort((a,b)=>{
    return b.score - a.score;
  });
}

export default {
  battle: (players)=>{
    return axios.all(players.map(getUserData))
                .then(sortPlayers)
                .catch(handleError)
  },
  fetchPopularRepos: (language)=>{
    let encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

    return axios.get(encodedURI)
      .then(response =>{
        return response.data.items;
      });
  }
}

