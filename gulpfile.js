var gulp = require('gulp');
var GulpSSH = require('gulp-ssh');
var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: {
        host: '149.56.159.52',
        port: 2205,
        username: 'dev',
        password: '=G%=c8K4'
    }
});

gulp.task('deploy-back-prod', function () {
    return gulpSSH
        .shell(['cd /home/dev/flatbed_api_ref', 'git pull'])
});

gulp.task('deploy-front-prod', function () {
    return gulpSSH
        .shell(['cd /home/dev/flatbed_api_ref/src/flatbed_dist', 'git pull'])
});

gulp.task('deploy-prod', function () {
    return gulpSSH
        .shell(['cd /home/dev/flatbed_api_ref', 'git pull', 'cd /home/dev/flatbed_api_ref/src/flatbed_dist', 'git pull'])
});

gulp.task('deploy-back-test', function () {
    return gulpSSH
        .shell(['cd /home/dev/flatbed_api_ref_dev', 'git pull'])
});

gulp.task('deploy-front-test', function () {
    return gulpSSH
        .shell(['cd /home/dev/flatbed_api_ref_dev/src/flatbed_dist', 'git pull'])
});

gulp.task('deploy-test', function () {
    return gulpSSH
        .shell(['cd /home/dev/flatbed_api_ref_dev', 'git pull', 'cd /home/dev/flatbed_api_ref_dev/src/flatbed_dist', 'git pull'])
});