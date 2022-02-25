# PHP Endpoint for Github Webhook URLs

If you love deploying websites using Github, but for some
 reason want to use your own server, this script might be
exactly what you need.


1. Put ``github.php`` somewhere on your PHP-enabled web server, and make it
   accessible for the outside world. Let's say for now the script lives
   on http://example.com/github.php

2. Somewhere on your server you need to have an update script that pulls your site
   from Github. If you're lucky, ``git`` is available on your server and you just
   need to run ``cd myrepo; git pull``. If not, you might as well download the entire
   repository as zip, unpack it, etc. Make sure that it is executable. Let's say the script
   lives on ``/path/to/update/script.sh``.

3. Put [config.json](#file-config-json) next to [github.php](#file-github-php)
   and update it according to your needs.

   If you want email notification (yes, you want!), enter your email
   address to **email.to**. The emails will also be sent to the email of the Github
   user who pushed to the repository. To help yourself recognizing where these strange commit
   emails are comming from, you should set **email.from** to something meaningful
   like github-push-notification@example.com.

   You can use it for several repositories or branches at the
   same time by adding more entries to the **endpoints** list. For each endpoint
   you need to set **endpoint.repo** to *"username/reponame"*. You
   can configure endpoints for different branches, for instance if you store your
   website in ``gh-pages`` branch or use different branches for
   development/production etc.

   Set **endpoint.run** to the path of your update script, e.g. ``/path/to/update/script.sh``.

   For clarity, describe what happened after the update script has been
   executed under **endpoint.action**. Usually that's something like *"Your website XY has
   been updated."*. It will be used as subject in notification emails. This is especially
   helpful if you have multiple endpoints.

   The email will also contain the output of your update script and all
   the messages of the pushed commits.

4. On the settings page of your Github repository, go to **Service Hooks** > **WebHook URLs** and
   enter the public url of your ``github.php``, e.g. http://example.com/github.php. On the same page
   you see a list of IP addresses Github sends the requests from. Make sure they're the same
   as defined [below](#file-github-php-L34).

5. If you don't want everybody to see your [config.json](#file-config-json), either prevent access
   using .htaccess or the like, or move it to a secure location on your server. If you
   move it, make sure the PHP script [knows where to find it](#file-github-php-L17).

And that's it.