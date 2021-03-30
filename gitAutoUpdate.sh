#!/bin/bash

### NOTES YOU MUST HAVE INSTALL GIT BEFORE USE THIS SCRIPT 
### IN WIN YOU MUST RUN git config core.autocrlf true
commitMessage=''

# Condition used to proceed with the action
correctSyntax=0

# We make a loop until the message syntax be correct
while (( $correctSyntax==0 ))
do

	echo "Enter your commit message:"
	
	# We require a message to send the commit
	read commitMessage
	
	# Get the lenght of the typed string
	messageLength=${#commitMessage}

	# Check if the length is more or equal to 10 the characteres
	if (( $messageLength >= 10 )) 
	then 
		# Procede with the code 
		correctSyntax=1
	else 
		# insert a new message
		echo "The commit message must be more or equal to 10 characteres."
	fi
done

# Add all files to the 
git add .

# Make a commit to repository
git commit -m "$commitMessage"

# Push the commit to the remote repository
git push origin master 

echo "Thanks to used a script maded by X1hibi."

