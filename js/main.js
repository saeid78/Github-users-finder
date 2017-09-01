$(document).ready(function(){
//console.log("loaded!")
 $('#searchUser').on('keyup', function(e){
    //console.log(e.target.value);
    let username = e.target.value;
    $.ajax({
    url:'https://api.github.com/users/'+username,
    data:{
        client_id:'ca0a7e7d7e3f08fb58e3',
        client_secret:'f88b4addae06b864fc3938876ff95ad64392651a'
    }
    }).done(function(user){
        $.ajax({
            url:'https://api.github.com/users/'+username+'/repos',
            data:{
                client_id:'ca0a7e7d7e3f08fb58e3',
                client_secret:'f88b4addae06b864fc3938876ff95ad64392651a',
                sort:'created: asc',
                per_page: 5
            }
        }).done(function(repos){
            //console.log(repos);

            $.each(repos, function(index, repos){
                $('#repos').append(`
                <div class="well">
                <div class="row">
                    <div class="col-md-7">
                    <strong>${repos.name}</strong>: ${repos.description}
                    </div>
                    <div class="col-md-3">
                        <span class="label label-default"> Forks: ${repos.forks_count}</span>
                        <span class="label label-primary">Watchers: ${repos.watchers_count}</span>
                        <span class="label label-success">Stars: ${repos.stargazers_count}</span>
                    </div>
                     
                    <div class="col-md-2">
                    <a href="${repos.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                    </div>

                </div>
                </div>
                `);
            });
        });
//        console.log(user);
        $('#profile').html(`
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">${user.name}</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img class="thumbnail avatar" src="${user.avatar_url}">
                            <a href="${user.html_url}" class="btn btn-primary btn-block" target= _blank>View Profile</a>
                        </div>

                        <div class="col-md-9">
                        <span class="label label-default"> Public Repos: ${user.public_repos}</span>
                        <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                        <span class="label label-success">Followers: ${user.followers}</span>
                        <span class="label label-info">Following: ${user.following}</span>
                        <br><br>

                        <ul class="list-group">
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">Website/blog: ${user.blog}</li>
                        <li class="list-group-item">Location: ${user.location}</li>
                        <li class="list-group-item">Member Since: ${user.created_at}</li>
                        </ul>
                        </div>
                    </div>

                </div>
            </div>
            <h3 class="page-header">Latest Repos</h3>
            <div id="repos"></div>           
            `);
        });

 });

});
