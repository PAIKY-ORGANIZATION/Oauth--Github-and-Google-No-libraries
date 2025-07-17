type ServerResponse = {
	message: string;
	success: boolean;
	data?: Any;
};


type GitHubUserResponse = {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: 'User';
	user_view_type: 'public' | string;
	site_admin: boolean;
	name: string | null;
	company: string | null;
	blog: string;
	location: string | null;
	email: string | null;
	hireable: boolean | null;
	bio: string | null;
	twitter_username: string | null;
	notification_email: string;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string; // ISO 8601 format
	updated_at: string; // ISO 8601 format
};


type GitHubEmailResponse = {
    email: string;
    primary: boolean;
    verified: boolean;
    visibility: string;
}[];



//! Assuming your redirect URL includes "scope=email%20profile"
type GoogleUserResponse = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};





