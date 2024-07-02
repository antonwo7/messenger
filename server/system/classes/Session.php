<?php

class Session implements SessionHandlerInterface{
	

    function open($save_path, $session_name){
        return true;
    }

    function close(){
        return true;
    }

    function read($id){
        global $db;
		
		$cur_session_node = $db->dom->getElementById($id);
		if($cur_session_node != null){
			return $cur_session_node->getElementsByTagName('data')->item(0)->nodeValue;
		}
		
		return '';
    }

    function write($id, $data){
        global $db;
		
		$cur_session_node = $db->dom->getElementById($id);
		
		if($cur_session_node == null){
			$sessions_node = $db->dom->getElementsByTagName('sessions')->item(0);
			$new_session_node = $db->dom->createElement('session');
			$new_session_node->setAttribute('xml:id', $id);
			$new_session_node->appendChild($db->dom->createElement('time', time()));
			$new_session_node->appendChild($db->dom->createElement('data', $data));
			$sessions_node->appendChild($new_session_node);
		}
		else{
			$cur_session_node->getElementsByTagName('time')->item(0)->nodeValue = time();
			$cur_session_node->getElementsByTagName('data')->item(0)->nodeValue = $data;
		}
		
		$db->dom->save(DB_URL);
		
		return true;
    }

    function destroy($id){
        global $db;
		
		$sessions_node = $db->dom->getElementsByTagName('sessions')->item(0);		
		$cur_session_node = $db->dom->getElementById($id); 
		if($cur_session_node != null){
			$sessions_node->removeChild($cur_session_node);
		}
		
		$db->dom->save(DB_URL);
		
		return true;
    }

    function gc($mlt){
		global $db;
		
		$sessions_node = $db->dom->getElementsByTagName('sessions')->item(0);
		
		foreach($db->dom->getElementsByTagName('session') as $session){
			$session_time = $session->getElementsByTagName('time')->item(0)->nodeValue;
			
			if ($session_time + $mlt < time()) {
               $sessions_node->removeChild($session);
            }
		}

        return true;
    }
}