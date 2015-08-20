#!/bin/bash

# if [ `git rev-parse --abbrev-ref HEAD` != "develop" ]; then
#   echo "Not on develop"
#   exit 1
# fi

# test -z "$(git status --porcelain)"
# if [ $? != 0 ]; then
#   echo "Repo not clean"
#   exit 1
# fi

gulpur build \
  && REV=`git rev-parse HEAD` \
  && cd ../../2016-fantasy.github.io \
`#  && git rm -r *` \
  && cp -r -v ../presidential-frontend/frontend/.dist/* ./ \
  && git add . --all \
  && git commit -m "Publishing $REV" \
  && git push origin master \
  && echo "Published!" \
|| echo "Something failed. Figure it out!"